
export interface JobListing {
  title: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

export const jobListings: JobListing[] = [
  {
    title: 'Sales Manager North',
    location: 'Karachi, Pakistan',
    type: 'Full-time',
    experience: '5+ years',
    description: 'Lead our sales operations in the northern region and drive business growth for our pharmaceutical products.',
    requirements: [
      'Bachelor\'s degree in Business, Marketing, or related field',
      '5+ years of sales management experience in pharmaceuticals',
      'Strong leadership and team management skills',
      'Proven track record of achieving sales targets',
      'Excellent communication and negotiation skills'
    ],
    responsibilities: [
      'Manage and lead the northern sales team',
      'Develop and implement regional sales strategies',
      'Build relationships with key clients and stakeholders',
      'Monitor sales performance and market trends',
      'Provide training and support to sales representatives'
    ]
  },
  {
    title: 'Medical Representative (Johar Karachi)',
    location: 'Johar, Karachi, Pakistan',
    type: 'Full-time',
    experience: '2-3 years',
    description: 'We are seeking a dynamic Medical Representative to promote our women\'s health products to healthcare professionals in the Johar area.',
    requirements: [
      'Bachelor\'s degree in Life Sciences, Pharmacy, or related field',
      '2-3 years of experience in pharmaceutical sales',
      'Strong communication and presentation skills',
      'Knowledge of women\'s health and gynecology preferred',
      'Valid driving license and willingness to travel'
    ],
    responsibilities: [
      'Promote BioGuardian products to doctors and healthcare facilities',
      'Build and maintain relationships with key opinion leaders',
      'Conduct educational presentations and product demonstrations',
      'Achieve sales targets and market share goals',
      'Provide market feedback and competitive intelligence'
    ]
  },
  {
    title: 'Medical Representative (Hyderabad)',
    location: 'Hyderabad, Pakistan',
    type: 'Full-time',
    experience: '2-3 years',
    description: 'We are seeking a dynamic Medical Representative to promote our women\'s health products to healthcare professionals in Hyderabad.',
    requirements: [
      'Bachelor\'s degree in Life Sciences, Pharmacy, or related field',
      '2-3 years of experience in pharmaceutical sales',
      'Strong communication and presentation skills',
      'Knowledge of women\'s health and gynecology preferred',
      'Valid driving license and willingness to travel'
    ],
    responsibilities: [
      'Promote BioGuardian products to doctors and healthcare facilities',
      'Build and maintain relationships with key opinion leaders',
      'Conduct educational presentations and product demonstrations',
      'Achieve sales targets and market share goals',
      'Provide market feedback and competitive intelligence'
    ]
  },
  {
    title: 'Social Media Manager',
    location: 'Karachi, Pakistan',
    type: 'Full-time',
    experience: '2-4 years',
    description: 'Manage our social media presence and digital marketing efforts to promote our pharmaceutical products and brand awareness.',
    requirements: [
      'Bachelor\'s degree in Marketing, Communications, or related field',
      '2-4 years of social media management experience',
      'Proficiency in social media platforms and management tools',
      'Strong content creation and copywriting skills',
      'Knowledge of digital marketing and analytics'
    ],
    responsibilities: [
      'Develop and execute social media strategies',
      'Create engaging content for various social media platforms',
      'Monitor and analyze social media performance',
      'Manage online community and customer interactions',
      'Collaborate with marketing team on digital campaigns'
    ]
  }
];
