
export const payments = [
  {
    id: 0 ,
    name:"yao k.",
    mobile: "Orange Money",
    number: "0701234567",
    amount: 5000,
    date: "16 Avril 2026",
  },
  {
    id: 1 ,
    name:"gboko ahou",
    mobile: "MTN MoMo",
    number: "0509876543",
    amount: 12000,
    date: "15 Avril 2026",
  },
  {
    id: 2 ,
    name:"ouattara aîcha",
    mobile: "moov Money",
    number: "0101234567",
    amount: 5000,
    date: "16 Avril 2026",
  },
  {
    id: 3 ,
    name:"kamagate alladji",
    mobile: "wave ",
    number: "0509876543",
    amount: 12000,
    date: "15 Avril 2026",
  },
  {
    id: 4 ,
    name:"amara yah",
    mobile: "Orange Money",
    number: "0701234567",
    amount: 5000,
    date: "16 Avril 2026",
  },
  {
    id: 5 ,
    name:"Kouadio Jr",
    mobile: "MTN MoMo",
    number: "0509876543",
    amount: 12000,
    date: "15 Avril 2026",
  },
  {
    id: 6 ,
    name:"Moh yah",
    mobile: "moov Money",
    number: "0101234567",
    amount: 5000,
    date: "16 Avril 2026",
  },
  {
    id: 7 ,
    name:"Koffi koffi",
    mobile: "wave ",
    number: "0509876543",
    amount: 12000,
    date: "15 Avril 2026",
  },
  {
    id: 8 ,
    name:"kouakou mariam",
    mobile: "moov Money",
    number: "0101234567",
    amount: 5000,
    date: "16 Avril 2026",
  },
  {
    id: 9 ,
    name:"amara gboko",
    mobile: "orange money ",
    number: "0509876543",
    amount: 12000,
    date: "15 Avril 2026",
  },
];


export const members = [
  {
    id: 0 ,
    name:"yao kan.",
    number: "0701234567",
    photo: "/pere.png",
    date: "16 Avril 1996",
  },
  {
    id: 1 ,
    name:"gboko ahou",
    number: "0509876543",
    photo: "/pere.png",
    date: "15 Avril 1996",
  },
  {
    id: 2 ,
    name:"ouattara aîcha",
    number: "0101234567",
    photo: "/pere.png",
    date: "16 Avril 1996",
  },
  {
    id: 3 ,
    name:"kamagate alladji",
    number: "0509876543",
    photo: "/pere.png",
    date: "15 Avril 1996",
  },
  {
    id: 4 ,
    name:"amara yah",
    number: "0701234567",
    photo: "/pere.png",
    date: "16 Avril 1996",
  },
  {
    id: 5 ,
    name:"Kouadio Jr",
    number: "0509876543",
    photo: "/pere.png",
    date: "15 Avril 1996",
  },
  {
    id: 6 ,
    name:"Moh yah",
    number: "0101234567",
    photo: "/pere.png",
    date: "16 Avril 1996",
  },
  {
    id: 7 ,
    name:"Koffi koffi",
    number: "0509876543",
    photo: "/pere.png",
    date: "15 Avril 1996",
  },
  {
    id: 8 ,
    name:"kouakou mariam",
    number: "0101234567",
    photo: "/pere.png",
    date: "16 Avril 1996",
  },
  {
    id: 9 ,
    name:"amara gboko",
    number: "0509876543",
    photo: "/pere.png",
    date: "15 Avril 1996",
  },
];


 export const expenses = [
  {
    id: 1,
    name: "Jean",
    description: "Organisation soirée",
    amount: 50000,
    mobile: "Orange Money",
    number: "0700000000",
    date: "2026-04-10",
  },
  {
    id: 2,
    name: "Awa",
    description: "Achat matériel",
    amount: 30000,
    mobile: "MTN",
    number: "0500000000",
    date: "2026-04-12",
  },
  {
    id: 3,
    name: "gboko",
    description: "ceremonie annuelle",
    amount: 30000,
    mobile: "MTN",
    number: "0500000000",
    date: "2025-04-12",
  },
];

export const user = {
  id: 0,
  role: "ADMIN", // ADMIN | MODERATEUR | MEMBER
  occupation: "President",
  satisfiestatut: "EN emploi",
  entreprise: "",
  isMember: true,

  firstName: "AMARA",
  lastName: "gboko",
  number: "0758019243",
  photo: "/pere.png",
  date: "16 Avril 1996",
  city: "abidjan",
  address: "Bingerville",
  sex: "M",
  email: "gboko@gmail.com",

  etablissement: "E2C_TIC",
  Niveau: "LICENCE",
  filiere: "full stack",
  matricule: "E2C_TIC",

  document: "",

  dejaMembre: true,
  numeroMembre: "AEEY-A25-001",
  certifie: true,

  section: "",

  // HISTORIQUE FINANCIER
  cautisation: [
    {
      id: 1,
      type: "cotisation",
      montant: 2000,
      date: "2026-04-10",
      statut: "payé",
    },
    {
      id: 2,
      type: "don",
      montant: 5000,
      date: "2026-04-12",
      statut: "payé",
    },
    {
      id: 3,
      type: "carte",
      montant: 5000,
      date: "2026-04-12",
      statut: "payé",
    },
  ],

  // CARTE MEMBRE
  memberCard: {
    status: "EN_ATTENTE", // EN_ATTENTE | VALIDÉE | REJETÉE
    demandeDate: "2026-04-15",
  },
};

export const userPayments = [
  {
    userID: 12 ,
    id: 1 ,
    name:"amara gboko",
    mobile: "Orange Money",
    number: "0701234567",
    amount: 5000,
    date: "16 Avril 2026",
  },
  {
    userID: 12 ,
    id: 2 ,
    name:"amara gboko",
    mobile: "MTN MoMo",
    number: "0509876543",
    amount: 12000,
    date: "15 Avril 2026",
  },
  {
    userID: 12 ,
    id: 3 ,
    name:"amara gboko",
    mobile: "moov Money",
    number: "0101234567",
    amount: 5000,
    date: "16 Avril 2026",
  },
  {
    userID: 12 ,
    id: 4 ,
    name:"amara gboko",
    mobile: "wave ",
    number: "0509876543",
    amount: 12000,
    date: "15 Avril 2026",
  },
];


export const pendingMembers = [
  {
    id: 1,
    role: "MEMBER",
    occupation: "Etudiant",
    satisfiestatut: "En formation",
    entreprise: "",
    isMember: false,

    firstName: "KOUASSI",
    lastName: "Jean",
    number: "0700000001",
    photo: "/user1.png",
    date: "12 Mars 2000",
    city: "Abidjan",
    address: "Yopougon",
    sex: "M",
    email: "jean.kouassi@gmail.com",

    etablissement: "UFHB",
    Niveau: "LICENCE 2",
    filiere: "Informatique",
    matricule: "UFHB12345",

    document: "cni.pdf",

    dejaMembre: false,
    numeroMembre: "",
    certifie: false,

    section: "IT",

    cautisation: [],

    memberCard: {
      status: "EN_ATTENTE",
      demandeDate: "2026-04-18",
    },
  },

  {
    id: 2,
    role: "MEMBER",
    occupation: "Comptable",
    satisfiestatut: "EN emploi",
    entreprise: "Société X",
    isMember: false,

    firstName: "YAO",
    lastName: "Marie",
    number: "0700000002",
    photo: "/user2.png",
    date: "05 Juin 1998",
    city: "Abidjan",
    address: "Cocody",
    sex: "F",
    email: "marie.yao@gmail.com",

    etablissement: "",
    Niveau: "",
    filiere: "",
    matricule: "",

    document: "attestation.pdf",

    dejaMembre: false,
    numeroMembre: "",
    certifie: false,

    section: "Finance",

    cautisation: [],

    memberCard: {
      status: "EN_ATTENTE",
      demandeDate: "2026-04-19",
    },
  },

  {
    id: 3,
    role: "MEMBER",
    occupation: "Développeur",
    satisfiestatut: "EN emploi",
    entreprise: "Startup Tech",
    isMember: false,

    firstName: "TRAORE",
    lastName: "Issa",
    number: "0700000003",
    photo: "/user3.png",
    date: "21 Janvier 1997",
    city: "Abidjan",
    address: "Abobo",
    sex: "M",
    email: "issa.traore@gmail.com",

    etablissement: "ESATIC",
    Niveau: "MASTER",
    filiere: "Réseaux",
    matricule: "ESA56789",

    document: "cv.pdf",

    dejaMembre: false,
    numeroMembre: "",
    certifie: false,

    section: "Tech",

    cautisation: [],

    memberCard: {
      status: "EN_ATTENTE",
      demandeDate: "2026-04-20",
    },
  },
];

export const eventsAds = [
  {
    id: 1,
    title: "Tournois AEEY Acte 1",
    description: "Participez au grand tournoi de football inter-membres.",
    date: "2027-12-25",
    image: "/foot2.png",
  },
  {
    id: 2,
    title: "Conférence Leadership",
    description: "Une rencontre inspirante avec des leaders locaux.",
    date: "2027-11-10",
    image: "/conference.png",
  },
  {
    id: 3,
    title: "Soirée Networking",
    description: "Élargissez votre réseau professionnel dans une ambiance détendue.",
    date: "2027-10-05",
    image: "/network.png",
  },
  {
    id: 4,
    title: "Formation Marketing",
    description: "Apprenez les bases du marketing digital efficacement.",
    date: "2027-09-18",
    image: "/marketing.png",
  },
];