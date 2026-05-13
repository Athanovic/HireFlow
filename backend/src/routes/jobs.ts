import { Router } from 'express';
import { JobModel } from '../models/Job.ts';
import { authenticateToken, authorizeRole } from '../middleware/auth.ts';

const router = Router();
let jobModel: JobModel;


export function setJobModel(db: any) {
  jobModel = JobModel.create(db);
}

// Get all jobs (public)
router.get('/', async (req, res) => {
  try {
    const { search, category, limit, offset } = req.query;
    const jobs = await jobModel.list({
      search: search as string || undefined,
      category: category as string || undefined,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined
    });
    res.json({ data: jobs });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid job ID' });
    }

    const job = await jobModel.findById(id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json({ data: job });
  } catch (error) {
    console.error('Get job by ID error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/', authenticateToken, authorizeRole(['employer', 'admin']), async (req, res) => {
  try {
    const {
      externalId, source, title, company, companyLogo, category, rawCategory,
      jobType, location, salary, description, fullDescription, url,
      applicationUrl, applyUrl, tags, postedAt, sourceName, featured
    } = req.body;

    // Validate required fields
    if (!title || !company) {
      return res.status(400).json({ error: 'Title and company are required' });
    }

    const job = await jobModel.create({
      externalId,
      source,
      title,
      company,
      companyLogo,
      category,
      rawCategory,
      jobType,
      location,
      salary,
      description,
      fullDescription,
      url,
      applicationUrl,
      applyUrl,
      tags,
      postedAt,
      sourceName,
      featured: featured || false,
      postedByUserId: req.user.id
    });

    res.status(201).json({ data: job });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid job ID' });
    }

    const job = await jobModel.findById(id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    
    const isOwner = job.postedByUserId === req.user.id;
    const isAdminOrEmployer = req.user.role === 'admin' || req.user.role === 'employer';

    if (!isOwner && !isAdminOrEmployer) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    const {
      externalId, source, title, company, companyLogo, category, rawCategory,
      jobType, location, salary, description, fullDescription, url,
      applicationUrl, applyUrl, tags, postedAt, sourceName, featured
    } = req.body;

    const updatedJob = await jobModel.update(id, {
      externalId,
      source,
      title,
      company,
      companyLogo,
      category,
      rawCategory,
      jobType,
      location,
      salary,
      description,
      fullDescription,
      url,
      applicationUrl,
      applyUrl,
      tags,
      postedAt,
      sourceName,
      featured
    });

    if (!updatedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json({ data: updatedJob });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid job ID' });
    }

    const job = await jobModel.findById(id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    
    const isOwner = job.postedByUserId === req.user.id;
    const isAdminOrEmployer = req.user.role === 'admin' || req.user.role === 'employer';

    if (!isOwner && !isAdminOrEmployer) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    const deleted = await jobModel.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/my/jobs', authenticateToken, async (req, res) => {
  try {
    const jobs = await jobModel.list({
      postedByUserId: req.user.id
    });
    res.json({ data: jobs });
  } catch (error) {
    console.error('Get my jobs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;