import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';
import Career from './models/Career.js';
import Resource from './models/Resource.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI!;

async function seed() {
  await mongoose.connect(MONGODB_URI, { dbName: 'career_guide' });

  // Clear existing data
  await Category.deleteMany({});
  await Career.deleteMany({});
  await Resource.deleteMany({});

  // Categories
  const categories = await Category.insertMany([
    { name: 'Frontend', description: 'UI/UX and client-side development' },
    { name: 'Backend', description: 'Server-side development' },
    { name: 'DevOps', description: 'Infrastructure, automation, and deployment' },
    { name: 'Data Science', description: 'Data analysis, ML, and AI' },
    { name: 'Mobile', description: 'Mobile app development' },
    { name: 'Security', description: 'Cybersecurity and InfoSec' },
    { name: 'Cloud', description: 'Cloud engineering and architecture' },
    { name: 'QA', description: 'Quality assurance and testing' },
    { name: 'Product', description: 'Product and project management' },
    { name: 'UI/UX', description: 'Design and user experience' },
  ]);

  // Resources
  const resources = await Resource.insertMany([
    { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/', type: 'Documentation', description: 'Comprehensive web docs for web developers.' },
    { title: 'freeCodeCamp', url: 'https://www.freecodecamp.org/', type: 'Course', description: 'Learn to code for free.' },
    { title: 'Kubernetes Docs', url: 'https://kubernetes.io/docs/', type: 'Documentation', description: 'Official Kubernetes documentation.' },
    { title: 'Scikit-learn', url: 'https://scikit-learn.org/', type: 'Library', description: 'Machine learning in Python.' },
    { title: 'OWASP', url: 'https://owasp.org/', type: 'Community', description: 'Open Web Application Security Project.' },
    { title: 'React Docs', url: 'https://react.dev/', type: 'Documentation', description: 'Official React documentation.' },
    { title: 'Node.js Docs', url: 'https://nodejs.org/en/docs', type: 'Documentation', description: 'Official Node.js documentation.' },
    { title: 'AWS Training', url: 'https://aws.amazon.com/training/', type: 'Course', description: 'AWS official training and certification.' },
    { title: 'Google Cloud Training', url: 'https://cloud.google.com/training', type: 'Course', description: 'Google Cloud learning resources.' },
    { title: 'Codecademy', url: 'https://www.codecademy.com/', type: 'Course', description: 'Interactive coding lessons.' },
    { title: 'Coursera', url: 'https://www.coursera.org/', type: 'Course', description: 'Online courses from top universities.' },
    { title: 'Udemy', url: 'https://www.udemy.com/', type: 'Course', description: 'Online learning platform.' },
    { title: 'Pluralsight', url: 'https://www.pluralsight.com/', type: 'Course', description: 'Tech skill development platform.' },
    { title: 'Docker Docs', url: 'https://docs.docker.com/', type: 'Documentation', description: 'Official Docker documentation.' },
    { title: 'Jenkins Docs', url: 'https://www.jenkins.io/doc/', type: 'Documentation', description: 'Jenkins automation server docs.' },
    { title: 'Kaggle', url: 'https://www.kaggle.com/', type: 'Community', description: 'Data science competitions and datasets.' },
    { title: 'Figma', url: 'https://www.figma.com/', type: 'Tool', description: 'Collaborative interface design tool.' },
    { title: 'Cypress', url: 'https://www.cypress.io/', type: 'Tool', description: 'End-to-end testing framework.' },
    { title: 'Snyk', url: 'https://snyk.io/', type: 'Tool', description: 'Security scanning for dependencies.' },
    { title: 'Product School', url: 'https://www.productschool.com/', type: 'Course', description: 'Product management training.' },
    { title: 'UX Collective', url: 'https://uxdesign.cc/', type: 'Community', description: 'UX design articles and resources.' },
    { title: 'Appium', url: 'https://appium.io/', type: 'Tool', description: 'Mobile app automation testing.' },
    { title: 'Flutter Docs', url: 'https://docs.flutter.dev/', type: 'Documentation', description: 'Official Flutter documentation.' },
    { title: 'Android Developers', url: 'https://developer.android.com/', type: 'Documentation', description: 'Official Android developer docs.' },
    { title: 'iOS Developer Library', url: 'https://developer.apple.com/library/archive/navigation/', type: 'Documentation', description: 'Apple iOS developer docs.' },
    { title: 'InfoSec Institute', url: 'https://resources.infosecinstitute.com/', type: 'Course', description: 'Cybersecurity training.' },
    { title: 'Cloud Academy', url: 'https://cloudacademy.com/', type: 'Course', description: 'Cloud computing training.' },
    { title: 'Test Automation University', url: 'https://testautomationu.applitools.com/', type: 'Course', description: 'Free test automation courses.' },
    { title: 'Scrum.org', url: 'https://www.scrum.org/', type: 'Community', description: 'Scrum and agile resources.' },
    { title: 'Project Management Institute', url: 'https://www.pmi.org/', type: 'Community', description: 'Project management certification and resources.' },
  ]);

  // Helper to get resource by title
  const getResource = (title: string) => resources.find(r => r.title === title)?._id;
  const getCategory = (name: string) => categories.find(c => c.name === name)?._id;

  // Careers (20+ with detailed info)
  await Career.insertMany([
    {
      name: 'Frontend Developer',
      category: getCategory('Frontend'),
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Accessibility', 'Testing'],
      learningPaths: ['freeCodeCamp', 'Codecademy', 'React Docs', 'MDN Web Docs'],
      resources: [getResource('MDN Web Docs'), getResource('React Docs'), getResource('freeCodeCamp'), getResource('Codecademy')],
      dailyTasks: ['Build UI components', 'Collaborate with designers', 'Optimize performance', 'Write unit and integration tests', 'Ensure accessibility'],
      description: 'Builds and maintains the user interface of web applications, focusing on usability, accessibility, and performance.'
    },
    {
      name: 'Backend Developer',
      category: getCategory('Backend'),
      skills: ['Node.js', 'Express', 'API Design', 'MongoDB', 'SQL', 'Authentication', 'Testing'],
      learningPaths: ['Node.js Docs', 'freeCodeCamp', 'Pluralsight'],
      resources: [getResource('Node.js Docs'), getResource('freeCodeCamp'), getResource('Pluralsight')],
      dailyTasks: ['Design APIs', 'Write server logic', 'Manage databases', 'Implement authentication', 'Write tests'],
      description: 'Handles server-side logic, databases, and APIs, ensuring security and scalability.'
    },
    {
      name: 'DevOps Engineer',
      category: getCategory('DevOps'),
      skills: ['Docker', 'Kubernetes', 'CI/CD', 'Cloud', 'Linux', 'Monitoring', 'Scripting'],
      learningPaths: ['Kubernetes Docs', 'Docker Docs', 'AWS Training', 'Google Cloud Training'],
      resources: [getResource('Kubernetes Docs'), getResource('Docker Docs'), getResource('AWS Training'), getResource('Google Cloud Training')],
      dailyTasks: ['Automate deployments', 'Monitor infrastructure', 'Manage CI/CD pipelines', 'Write scripts', 'Troubleshoot production issues'],
      description: 'Bridges development and operations, focusing on automation, deployment, and cloud infrastructure.'
    },
    {
      name: 'Data Scientist',
      category: getCategory('Data Science'),
      skills: ['Python', 'Pandas', 'Machine Learning', 'Statistics', 'Data Visualization', 'SQL', 'Deep Learning'],
      learningPaths: ['Scikit-learn', 'Kaggle', 'Coursera'],
      resources: [getResource('Scikit-learn'), getResource('Kaggle'), getResource('Coursera')],
      dailyTasks: ['Analyze data', 'Build ML models', 'Visualize results', 'Clean and preprocess data', 'Present findings'],
      description: 'Extracts insights from data and builds predictive models using statistical and machine learning techniques.'
    },
    {
      name: 'Mobile App Developer',
      category: getCategory('Mobile'),
      skills: ['Flutter', 'React Native', 'Android', 'iOS', 'Dart', 'Swift', 'Kotlin'],
      learningPaths: ['Flutter Docs', 'Android Developers', 'iOS Developer Library'],
      resources: [getResource('Flutter Docs'), getResource('Android Developers'), getResource('iOS Developer Library')],
      dailyTasks: ['Build mobile apps', 'Test on multiple devices', 'Publish to app stores', 'Fix bugs', 'Optimize performance'],
      description: 'Designs and develops mobile applications for Android and iOS platforms.'
    },
    {
      name: 'Cybersecurity Analyst',
      category: getCategory('Security'),
      skills: ['Network Security', 'Penetration Testing', 'SIEM', 'Incident Response', 'Python', 'Risk Assessment'],
      learningPaths: ['OWASP', 'InfoSec Institute', 'Coursera'],
      resources: [getResource('OWASP'), getResource('InfoSec Institute'), getResource('Coursera')],
      dailyTasks: ['Monitor security alerts', 'Conduct vulnerability assessments', 'Respond to incidents', 'Write security reports', 'Educate staff'],
      description: 'Protects systems and data from cyber threats by monitoring, analyzing, and responding to security incidents.'
    },
    {
      name: 'Cloud Engineer',
      category: getCategory('Cloud'),
      skills: ['AWS', 'Azure', 'Google Cloud', 'Terraform', 'CI/CD', 'Networking'],
      learningPaths: ['AWS Training', 'Google Cloud Training', 'Cloud Academy'],
      resources: [getResource('AWS Training'), getResource('Google Cloud Training'), getResource('Cloud Academy')],
      dailyTasks: ['Design cloud architectures', 'Automate infrastructure', 'Monitor cloud resources', 'Optimize costs', 'Implement security best practices'],
      description: 'Designs, builds, and maintains cloud infrastructure and services.'
    },
    {
      name: 'QA Engineer',
      category: getCategory('QA'),
      skills: ['Manual Testing', 'Automation', 'Cypress', 'Appium', 'Bug Reporting', 'Test Planning'],
      learningPaths: ['Test Automation University', 'Cypress', 'Appium'],
      resources: [getResource('Test Automation University'), getResource('Cypress'), getResource('Appium')],
      dailyTasks: ['Write and execute test cases', 'Automate tests', 'Report bugs', 'Collaborate with developers', 'Plan test strategies'],
      description: 'Ensures software quality through manual and automated testing.'
    },
    {
      name: 'Product Manager',
      category: getCategory('Product'),
      skills: ['Roadmapping', 'User Research', 'Agile', 'Scrum', 'Stakeholder Management', 'Analytics'],
      learningPaths: ['Product School', 'Scrum.org', 'Project Management Institute'],
      resources: [getResource('Product School'), getResource('Scrum.org'), getResource('Project Management Institute')],
      dailyTasks: ['Define product vision', 'Gather requirements', 'Prioritize features', 'Coordinate teams', 'Analyze metrics'],
      description: 'Leads product strategy, working with cross-functional teams to deliver value to users.'
    },
    {
      name: 'UI/UX Designer',
      category: getCategory('UI/UX'),
      skills: ['Figma', 'Wireframing', 'Prototyping', 'User Research', 'Accessibility', 'Design Systems'],
      learningPaths: ['Figma', 'UX Collective', 'Coursera'],
      resources: [getResource('Figma'), getResource('UX Collective'), getResource('Coursera')],
      dailyTasks: ['Design user interfaces', 'Conduct user research', 'Create prototypes', 'Test usability', 'Document design systems'],
      description: 'Designs intuitive and visually appealing user experiences for digital products.'
    },
    {
      name: 'Full Stack Developer',
      category: getCategory('Frontend'),
      skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'SQL', 'APIs'],
      learningPaths: ['freeCodeCamp', 'Codecademy', 'Pluralsight'],
      resources: [getResource('freeCodeCamp'), getResource('Codecademy'), getResource('Pluralsight')],
      dailyTasks: ['Build frontend and backend', 'Integrate APIs', 'Deploy applications', 'Write tests', 'Fix bugs'],
      description: 'Works on both frontend and backend, building complete web applications.'
    },
    {
      name: 'Machine Learning Engineer',
      category: getCategory('Data Science'),
      skills: ['Python', 'TensorFlow', 'PyTorch', 'ML Ops', 'Data Engineering', 'Deep Learning'],
      learningPaths: ['Kaggle', 'Coursera', 'Scikit-learn'],
      resources: [getResource('Kaggle'), getResource('Coursera'), getResource('Scikit-learn')],
      dailyTasks: ['Build ML pipelines', 'Train and deploy models', 'Optimize algorithms', 'Collaborate with data scientists', 'Monitor model performance'],
      description: 'Develops, deploys, and maintains machine learning models in production.'
    },
    {
      name: 'Site Reliability Engineer',
      category: getCategory('DevOps'),
      skills: ['Linux', 'Monitoring', 'Incident Response', 'Automation', 'Cloud', 'Scripting'],
      learningPaths: ['AWS Training', 'Google Cloud Training', 'Pluralsight'],
      resources: [getResource('AWS Training'), getResource('Google Cloud Training'), getResource('Pluralsight')],
      dailyTasks: ['Monitor systems', 'Automate reliability tasks', 'Respond to incidents', 'Improve uptime', 'Write scripts'],
      description: 'Ensures reliability, availability, and performance of large-scale systems.'
    },
    {
      name: 'Business Analyst',
      category: getCategory('Product'),
      skills: ['Requirements Gathering', 'Process Modeling', 'SQL', 'Analytics', 'Stakeholder Management'],
      learningPaths: ['Coursera', 'Project Management Institute'],
      resources: [getResource('Coursera'), getResource('Project Management Institute')],
      dailyTasks: ['Analyze business processes', 'Gather requirements', 'Create documentation', 'Support project delivery', 'Communicate with stakeholders'],
      description: 'Bridges business needs and technical solutions through analysis and documentation.'
    },
    {
      name: 'Scrum Master',
      category: getCategory('Product'),
      skills: ['Scrum', 'Agile', 'Facilitation', 'Coaching', 'Conflict Resolution'],
      learningPaths: ['Scrum.org', 'Coursera'],
      resources: [getResource('Scrum.org'), getResource('Coursera')],
      dailyTasks: ['Facilitate scrum ceremonies', 'Remove impediments', 'Coach teams', 'Track progress', 'Promote agile values'],
      description: 'Facilitates agile teams, ensuring effective delivery and continuous improvement.'
    },
    {
      name: 'Penetration Tester',
      category: getCategory('Security'),
      skills: ['Ethical Hacking', 'Vulnerability Assessment', 'Python', 'Network Security', 'Reporting'],
      learningPaths: ['OWASP', 'InfoSec Institute'],
      resources: [getResource('OWASP'), getResource('InfoSec Institute')],
      dailyTasks: ['Conduct penetration tests', 'Write reports', 'Present findings', 'Advise on remediation', 'Stay updated on threats'],
      description: 'Simulates cyberattacks to identify and help fix security vulnerabilities.'
    },
    {
      name: 'Automation Engineer',
      category: getCategory('QA'),
      skills: ['Selenium', 'Cypress', 'Appium', 'JavaScript', 'Test Automation'],
      learningPaths: ['Test Automation University', 'Cypress', 'Appium'],
      resources: [getResource('Test Automation University'), getResource('Cypress'), getResource('Appium')],
      dailyTasks: ['Develop automation scripts', 'Maintain test frameworks', 'Integrate with CI/CD', 'Report bugs', 'Collaborate with QA'],
      description: 'Builds and maintains automated test suites to ensure software quality.'
    },
    {
      name: 'Agile Coach',
      category: getCategory('Product'),
      skills: ['Agile', 'Coaching', 'Facilitation', 'Change Management', 'Training'],
      learningPaths: ['Scrum.org', 'Coursera'],
      resources: [getResource('Scrum.org'), getResource('Coursera')],
      dailyTasks: ['Coach teams', 'Facilitate workshops', 'Promote agile practices', 'Support change initiatives', 'Mentor scrum masters'],
      description: 'Guides organizations and teams in adopting and improving agile methodologies.'
    },
    {
      name: 'UX Researcher',
      category: getCategory('UI/UX'),
      skills: ['User Interviews', 'Surveys', 'Usability Testing', 'Data Analysis', 'Persona Creation'],
      learningPaths: ['UX Collective', 'Coursera'],
      resources: [getResource('UX Collective'), getResource('Coursera')],
      dailyTasks: ['Plan and conduct research', 'Analyze user data', 'Present findings', 'Collaborate with designers', 'Create personas'],
      description: 'Studies user behavior and needs to inform design decisions.'
    },
    {
      name: 'Technical Writer',
      category: getCategory('Product'),
      skills: ['Writing', 'Documentation', 'API Docs', 'Markdown', 'Communication'],
      learningPaths: ['MDN Web Docs', 'Coursera'],
      resources: [getResource('MDN Web Docs'), getResource('Coursera')],
      dailyTasks: ['Write documentation', 'Update API docs', 'Collaborate with engineers', 'Edit content', 'Publish guides'],
      description: 'Creates and maintains technical documentation for products and APIs.'
    },
    {
      name: 'Platform Engineer',
      category: getCategory('Cloud'),
      skills: ['Kubernetes', 'Cloud', 'CI/CD', 'Infrastructure as Code', 'Monitoring'],
      learningPaths: ['Kubernetes Docs', 'AWS Training', 'Cloud Academy'],
      resources: [getResource('Kubernetes Docs'), getResource('AWS Training'), getResource('Cloud Academy')],
      dailyTasks: ['Build platform tools', 'Automate infrastructure', 'Support developers', 'Monitor systems', 'Improve reliability'],
      description: 'Builds and maintains internal platforms and tools to support development teams.'
    },
    {
      name: 'Data Engineer',
      category: getCategory('Data Science'),
      skills: ['ETL', 'SQL', 'Python', 'Big Data', 'Data Warehousing', 'Cloud'],
      learningPaths: ['Coursera', 'Google Cloud Training', 'Kaggle'],
      resources: [getResource('Coursera'), getResource('Google Cloud Training'), getResource('Kaggle')],
      dailyTasks: ['Build data pipelines', 'Manage databases', 'Optimize queries', 'Integrate data sources', 'Collaborate with data scientists'],
      description: 'Designs, builds, and maintains data infrastructure and pipelines.'
    },
  ]);

  console.log('Database seeded with 20+ detailed careers!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
}); 