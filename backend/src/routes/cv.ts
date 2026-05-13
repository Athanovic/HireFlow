import { Router } from 'express';
import { CVModel } from '../models/CV.ts';
import { authenticateToken } from '../middleware/auth.ts';
import multer from 'multer';
import path from 'path';

const router = Router();
let cvModel: CVModel;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'backend/uploads'));
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `cv-${req.user.id}-${timestamp}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

export function setCVModel(db: any) {
  cvModel = CVModel.create(db);
}


router.post('/', authenticateToken, upload.single('cvFile'), async (req, res) => {
  try {
    const { fullName, email, phone, linkedinUrl, currentRole, expectedSalary } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({ error: 'Full name and email are required' });
    }

    const existingCV = await cvModel.findByUserId(req.user.id);
    const cvFilePath = req.file ? req.file.path : (existingCV?.cv_file_path || null);

    if (existingCV) {
      const updated = await cvModel.update(existingCV.id!, {
        full_name: fullName,
        email,
        phone: phone || undefined,
        linkedin_url: linkedinUrl || undefined,
        current_role: currentRole || undefined,
        expected_salary: expectedSalary || undefined,
        cv_file_path: cvFilePath || undefined
      });
      return res.json({ data: updated });
    }

    const cv = await cvModel.create({
      user_id: req.user.id,
      full_name: fullName,
      email,
      phone: phone || undefined,
      linkedin_url: linkedinUrl || undefined,
      current_role: currentRole || undefined,
      expected_salary: expectedSalary || undefined,
      cv_file_path: cvFilePath || undefined
    });

    res.status(201).json({ data: cv });
  } catch (error: any) {
    console.error('Upload CV error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});


router.get('/my', authenticateToken, async (req, res) => {
  try {
    const cv = await cvModel.findByUserId(req.user.id);
    if (!cv) {
      return res.status(404).json({ error: 'CV not found' });
    }
    res.json({ data: cv });
  } catch (error: any) {
    console.error('Get CV error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
