import fond from '../images/fond.jpg';
import ICONAWD from '../images/ICONAWD.png';
import billet from '../images/billet.png';

const PROJECTS = [
    {
        title: 'Billet de Mariage Numerique',
        description:
            "Site vitrine pour convier ces amie, connaissance etc... a son mariage et les tenir informes.",
        technologies: ['React.js','Node.js', 'Vercel'],
        image: billet,
        imageAlt: 'Aperçu du Billet',
        url: 'https://billet-mariagedave.vercel.app/',
    },
    {
        title: 'Test Fonctionnel et Realisation de Maquette Mobile',
        description:
            "Site vitrine immersif pour une solution de paiement numerique en Afrique",
        technologies: ['React', 'Postman', 'Tailwind CSS', 'Figma'],
        image: ICONAWD,
        imageAlt: 'Aperçu du site AWDPAY',
        url: 'https://awdpay.com',
    },
    {
        title: 'Application web de getion de colis (Projet BTS)',
        description:
            "Tableau de bord en temps réel, securite des colis via OTP, historique et gestion d'etat. --> voir les images sur mon Github",
        technologies: ['React.js', 'Laravel', 'UML', 'Figma', 'SQL'],
        image: fond,
        imageAlt: 'Aperçu du projet',
        url: 'https://github.com/emmanuelngompe/boxify',
    },
    // {
    //     title: 'VitalFin',
    //     description:
    //         'Application mobile combinant pilotage budgétaire personnel et indicateurs bien-être quotidiens.',
    //     technologies: ['Flutter', 'Dart', 'Firebase', 'Node.js'],
    //     image: null,
    //     imageAlt: 'Aperçu du projet VitalFin',
    //     url: 'https://example.com/vitalfin',
    // },
];

export default PROJECTS;