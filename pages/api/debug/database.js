import db from '../../../utils/db';
import Project from '../../../models/Project';

export default async function handler(req, res) {
  try {
    console.log('=== DATABASE DEBUG API ===');
    
    // Test database connection
    await db.connectDb();
    console.log('Database connected successfully');
    
    // Test if we can query projects
    const projectCount = await Project.countDocuments();
    console.log('Total projects in database:', projectCount);
    
    // Get a sample project
    const sampleProject = await Project.findOne({ status: 'active' });
    console.log('Sample project:', sampleProject ? sampleProject.title : 'No projects found');
    
    // Test specific slug if provided
    const { slug } = req.query;
    if (slug) {
      const projectBySlug = await Project.findOne({ slug, status: 'active' });
      console.log(`Project with slug "${slug}":`, projectBySlug ? projectBySlug.title : 'Not found');
    }
    
    res.status(200).json({
      success: true,
      data: {
        connected: true,
        projectCount,
        sampleProject: sampleProject ? {
          title: sampleProject.title,
          slug: sampleProject.slug,
          status: sampleProject.status
        } : null,
        testSlug: slug,
        projectBySlug: slug ? (await Project.findOne({ slug, status: 'active' })) : null
      }
    });
    
  } catch (error) {
    console.error('Database debug error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
}
