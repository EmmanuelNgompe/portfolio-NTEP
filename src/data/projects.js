import fond from '../images/fond.jpg';
import ICONAWD from '../images/ICONAWD.png';
import billet from '../images/billet.png';

const PROJECTS = [
    {
        titleKey: 'project.rhc.title',
        descriptionKey: 'project.rhc.description',
        technologies: ['WordPress', 'Hostinger'],
        image: fond,
        imageWidth: 1024,
        imageHeight: 1024,
        imageAltKey: 'project.rhc.imageAlt',
        url: 'https://risinghopecommunity.com',
    },
    {
        titleKey: 'project.wedding.title',
        descriptionKey: 'project.wedding.description',
        technologies: ['React.js','Node.js', 'Vercel'],
        image: billet,
        imageWidth: 1401,
        imageHeight: 855,
        imageAltKey: 'project.wedding.imageAlt',
        url: 'https://billet-mariagedave.vercel.app/',
    },
    {
        titleKey: 'project.awdpay.title',
        descriptionKey: 'project.awdpay.description',
        technologies: ['React', 'Postman', 'Tailwind CSS', 'Figma'],
        image: ICONAWD,
        imageWidth: 1000,
        imageHeight: 1000,
        imageAltKey: 'project.awdpay.imageAlt',
        url: 'https://awdpay.com',
    },
    {
        titleKey: 'project.boxify.title',
        descriptionKey: 'project.boxify.description',
        technologies: ['React.js', 'Laravel', 'UML', 'Figma', 'SQL'],
        image: fond,
        imageWidth: 1024,
        imageHeight: 1024,
        imageAltKey: 'project.boxify.imageAlt',
        url: 'https://github.com/emmanuelngompe/boxify',
    },
    
];

export default PROJECTS;