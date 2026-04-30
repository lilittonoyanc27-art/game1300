export interface SeaQuestion {
  id: string;
  sentence: string;
  options: string[];
  correctIndex: number;
  translation: string;
  explanation: string;
}

export const DIRECTION_QUESTIONS: SeaQuestion[] = [
  {
    id: '1',
    sentence: "¿_______ vas con ese barco?",
    options: ["Dónde", "Adónde", "De dónde"],
    correctIndex: 1,
    translation: "Ո՞ւր ես գնում այդ նավով:",
    explanation: "'Adónde' օգտագործվում է շարժման ուղղությունը կամ նպատակակետը հարցնելիս:"
  },
  {
    id: '2',
    sentence: "¿_______ eres?",
    options: ["Dónde", "Adónde", "De dónde"],
    correctIndex: 2,
    translation: "Որտեղի՞ց ես:",
    explanation: "'De dónde' օգտագործվում է ծագումը կամ սկզբնակետը հարցնելիս:"
  },
  {
    id: '3',
    sentence: "¿_______ está el mapa del tesoro?",
    options: ["Dónde", "Adónde", "De dónde"],
    correctIndex: 0,
    translation: "Որտե՞ղ է գանձերի քարտեզը:",
    explanation: "'Dónde' օգտագործվում է գտնվելու վայրը (ստատիկ) հարցնելիս:"
  },
  {
    id: '4',
    sentence: "¿_______ viene ese barco pirata?",
    options: ["Dónde", "Adónde", "De dónde"],
    correctIndex: 2,
    translation: "Որտեղի՞ց է գալիս այս պիրատական նավը:",
    explanation: "Շարժման սկզբնակետը հարցնելիս օգտագործում ենք 'De dónde':"
  },
  {
    id: '5',
    sentence: "¿_______ podemos encontrar perlas?",
    options: ["Dónde", "Adónde", "De dónde"],
    correctIndex: 0,
    translation: "Որտե՞ղ կարող ենք մարգարիտներ գտնել:",
    explanation: "Գտնվելու վայրի կամ տեղի մասին հարցնելիս:"
  },
  {
    id: '6',
    sentence: "¿_______ navegan los marineros hoy?",
    options: ["Dónde", "Adónde", "De dónde"],
    correctIndex: 1,
    translation: "Ո՞ւր են նավարկում նավաստիներն այսօր:",
    explanation: "'Adónde' (a + dónde) ցույց է տալիս ուղղություն դեպի ինչ-որ տեղ:"
  },
  {
    id: '7',
    sentence: "¿_______ vive el gran pulpo?",
    options: ["Dónde", "Adónde", "De dónde"],
    correctIndex: 0,
    translation: "Որտե՞ղ է ապրում մեծ ութոտնուկը:",
    explanation: "Բնակության վայրը հարցնելիս օգտագործվում է 'Dónde':"
  },
  {
    id: '8',
    sentence: "¿_______ sacaste esa brújula antigua?",
    options: ["Dónde", "Adónde", "De dónde"],
    correctIndex: 2,
    translation: "Որտեղի՞ց հանեցիր այդ հին կողմնացույցը:",
    explanation: "Աղբյուրը կամ ծագումը հարցնելիս օգտագործվում է 'De dónde':"
  },
  {
    id: '9',
    sentence: "¿_______ quieres viajar el próximo verano?",
    options: ["Dónde", "Adónde", "De dónde"],
    correctIndex: 1,
    translation: "Ո՞ւր ես ուզում ճանապարհորդել հաջորդ ամռանը:",
    explanation: "Ճանապարհորդության նպատակակետը հարցնելիս:"
  },
  {
    id: '10',
    sentence: "¿_______ están mis binoculares?",
    options: ["Dónde", "Adónde", "De dónde"],
    correctIndex: 0,
    translation: "Որտե՞ղ են իմ հեռադիտակները:",
    explanation: "Իրերի գտնվելու վայրը հարցնելիս օգտագործում ենք 'Dónde':"
  }
];

export const VOYAGE_ASSETS = {
  bg: 'https://images.unsplash.com/photo-1518112391136-ecba6e6802f0?q=80&w=1200&auto=format&fit=crop',
  ship: 'https://cdn-icons-png.flaticon.com/512/3551/3551152.png',
  island: 'https://cdn-icons-png.flaticon.com/512/3063/3063814.png',
  compass: 'https://cdn-icons-png.flaticon.com/512/3134/3134105.png',
  wheel: 'https://cdn-icons-png.flaticon.com/512/3063/3063829.png',
  anchor: 'https://cdn-icons-png.flaticon.com/512/3063/3063825.png'
};
