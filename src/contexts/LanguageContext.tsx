import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type Lang = 'bn' | 'fr';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<Lang, Record<string, string>> = {
  bn: {
    // Navigation
    'nav.home': 'হোম',
    'nav.courses': 'আমাদের কোর্স',
    'nav.about': 'আমাদের সম্পর্কে',
    'nav.contact': 'যোগাযোগ',
    'nav.portal': 'শিক্ষার্থী পোর্টাল',
    'nav.connection': 'কনেকশন',

    // Hero
    'hero.label': 'অনলাইন ফরাসি ভাষা স্কুল',
    'hero.title': 'FN Formation',
    'hero.desc': 'ফরাসি ভাষা শিখুন এবং DELF পরীক্ষায় সফল হোন',
    'hero.btn1': 'আমাদের কোর্স দেখুন',
    'hero.btn2': 'যোগাযোগ করুন',

    // About
    'about.label': 'আমাদের সম্পর্কে',
    'about.title': 'ফরাসি ভাষা শেখার সঙ্গী',
    'about.desc': 'FN Formation একটি অনলাইন ফরাসি ভাষা স্কুল যা DELF পরীক্ষার প্রস্তুতির জন্য বিশেষায়িত। আমরা অভিজ্ঞ শিক্ষকদের মাধ্যমে আপনাকে ফরাসি ভাষায় দক্ষ করে তুলতে প্রতিশ্রুতিবদ্ধ। আমাদের লক্ষ্য হল প্রতিটি শিক্ষার্থীকে তাদের লক্ষ্য অর্জনে সাহায্য করা।',
    'about.link': 'আরও জানুন',
    'about.stat1.num': '৫০০+',
    'about.stat1.label': 'শিক্ষার্থী',
    'about.stat2.num': '৫+',
    'about.stat2.label': 'বছরের অভিজ্ঞতা',
    'about.stat3.num': '৯৮%',
    'about.stat3.label': 'সন্তুষ্টি',

    // Courses
    'courses.label': 'আমাদের কোর্স',
    'courses.title': 'DELF কোর্সসমূহ',
    'courses.desc': 'আমাদের বিশেষায়িত DELF প্রস্তুতি কোর্সগুলো আপনাকে লক্ষ্য অর্জনে সাহায্য করবে',
    'courses.btn': 'সব কোর্স দেখুন',
    'course.buy': 'ক্রয় করুন',

    // Course details
    'course.a1.title': 'DELF A1 কোর্স',
    'course.a1.desc': 'ফরাসি ভাষায় প্রথম পদক্ষেপ। মৌলিক যোগাযোগ দক্ষতা অর্জন করুন।',
    'course.a2.title': 'DELF A2 কোর্স',
    'course.a2.desc': 'প্রাথমিক স্তর। দৈনন্দিন পরিস্থিতিতে ফরাসি ভাষায় কথা বলুন।',
    'course.b1.title': 'DELF B1 কোর্স',
    'course.b1.desc': 'মধ্যম স্তর। স্বাধীনভাবে ফরাসি ভাষায় যোগাযোগ করুন।',
    'course.b2.title': 'DELF B2 কোর্স',
    'course.b2.desc': 'উচ্চ মধ্যম স্তর। জটিল বিষয়ে আত্মবিশ্বাসের সঙ্গে কথা বলুন।',

    // Why Choose Us
    'why.label': 'কেন আমরা',
    'why.title': 'প্রতিটি ধাপে উৎকর্ষতা',
    'why.1.title': 'অভিজ্ঞ শিক্ষক',
    'why.1.desc': 'আমাদের শিক্ষকরা ফরাসি ভাষায় উচ্চশিক্ষিত এবং বহু বছরের অভিজ্ঞতা সম্পন্ন।',
    'why.2.title': 'গুণগত মানের সিলেবাস',
    'why.2.desc': 'DELF পরীক্ষার জন্য বিশেষভাবে তৈরি সিলেবাস যা সম্পূর্ণ কারিকুলাম অনুসরণ করে।',
    'why.3.title': 'যোগাযোগের সুবিধা',
    'why.3.desc': '২৪/৭ সাপোর্ট এবং ব্যক্তিগত পরামর্শ প্রতিটি শিক্ষার্থীর জন্য।',
    'why.4.title': 'সফলতার হার',
    'why.4.desc': 'আমাদের ৯৮% শিক্ষার্থী প্রথম চেষ্টাতেই DELF পরীক্ষায় উত্তীর্ণ হন।',

    // Testimonials
    'trust.title': 'তারা আমাদের বিশ্বাস করে',

    // CTA
    'cta.title': 'ফরাসি শেখার যাত্রা শুরু করুন',
    'cta.desc': 'যেকোনো স্তরের ফরাসি শিক্ষার্থীর জন্য আমাদের বিশেষায়িত কোর্স রয়েছে। আজই যোগাযোগ করুন!',
    'cta.whatsapp': 'যোগাযোগ করুন',

    // Footer
    'footer.tagline': 'ফরাসি শিখুন এবং সাফল্যের দিকে এগিয়ে চলুন',
    'footer.nav': 'নেভিগেশন',
    'footer.legal': 'আইনগত তথ্য',
    'footer.siret': 'SIRET: 98259717100015',
    'footer.tva': 'TVA: FR9787348734',
    'footer.phone': 'Tél: +33 7 51 32 61 18',
    'footer.rights': '© 2026 FN Formation. সর্বস্বত্ব সংরক্ষিত।',
    'footer.privacy': 'গোপনীয়তা নীতি',
    'footer.legal2': 'আইনি বিজ্ঞপ্তি',

    // Courses Page
    'coursespage.title': 'DELF প্রস্তুতি কোর্স',
    'coursespage.desc': 'আমাদের সমস্ত কোর্স প্রি-রেকর্ড করা ভিডিও যা YouTube-ে স্ট্রিম করা হয়',
    'coursespage.how': 'কিভাবে কাজ করে',
    'coursespage.step1': 'কোর্স নির্বাচন করুন',
    'coursespage.step1d': 'আপনার স্তর অনুযায়ী সঠিক DELF কোর্সটি বেছে নিন।',
    'coursespage.step2': 'নিরাপদে অনলাইনে পেমেন্ট করুন',
    'coursespage.step2d': 'কার্ড দিয়ে সরাসরি ওয়েবসাইটে কোর্সের মূল্য পরিশোধ করুন।',
    'coursespage.step3': 'শেখা শুরু করুন',
    'coursespage.step3d': 'পেমেন্ট নিশ্চিত হলে কোর্স অ্যাক্সেস পেয়ে যাবেন।',

    // Course card features
    'course.feature1': 'প্রি-রেকর্ড করা ভিডিও লেকচার',
    'course.feature2': 'অভিজ্ঞ শিক্ষকদের দ্বারা',
    'course.feature3': 'অনুশীলনী ও মডেল টেস্ট',
    'course.feature4': 'সার্টিফিকেট',
    'course.buy2': 'কোর্স কিনুন',
    'course.demo': 'ডেমো ক্লাস দেখুন',

    // Course detail page
    'coursedetail.back': 'কোর্সে ফিরে যান',
    'coursedetail.whatyoulearn': 'আপনি যা শিখবেন',
    'coursedetail.curriculum': 'কোর্স কারিকুলাম',
    'coursedetail.requirements': 'প্রয়োজনীয়তা',
    'coursedetail.requirements.1': 'ফরাসি ভাষার পূর্ব জ্ঞানের প্রয়োজন নেই',
    'coursedetail.requirements.2': 'ইন্টারনেট সংযোগসহ একটি কম্পিউটার বা স্মার্টফোন',
    'coursedetail.requirements.3': 'নিয়মিত কোর্স অনুসরণ করার আগ্রহ',
    'coursedetail.instructor': 'শিক্ষক',
    'coursedetail.enroll': 'এখনই ভর্তি হন',
    'coursedetail.demo': 'ডেমো ক্লাস দেখুন',
    'coursedetail.duration': 'সময়কাল',
    'coursedetail.lessons': 'পাঠ',
    'coursedetail.level': 'স্তর',
    'coursedetail.includes': 'এই কোর্সে যা আছে',
    'coursedetail.learn1': 'প্রি-রেকর্ড করা ভিডিও লেসন, যেকোনো সময় দেখা যাবে',
    'coursedetail.learn2': 'প্রতিটি মডিউলের পর ব্যবহারিক অনুশীলন',
    'coursedetail.learn3': 'আসল DELF পরীক্ষার শর্তে মক টেস্ট',
    'coursedetail.learn4': 'কোর্স শেষে একটি সার্টিফিকেট',
    'coursedetail.overview': 'কোর্সের ওভারভিউ',
    'coursedetail.weeks': 'সপ্তাহ',
    'coursedetail.week': 'সপ্তাহ',
    'coursedetail.classes': 'ক্লাস',
    'coursedetail.certificate': 'সার্টিফিকেট অর্জন করুন',
    'coursedetail.certificate.desc': 'সপ্তাহ ১৬ সফলভাবে শেষ করার সাথে সাথেই আপনি স্বয়ংক্রিয়ভাবে একটি সার্টিফিকেট পাবেন যা আপনার সিভিতে যুক্ত করতে পারবেন।',
    'coursedetail.enrolled': 'জন শিক্ষার্থী ভর্তি হয়েছেন',
    'coursedetail.reviews': 'রিভিউ',
    'coursedetail.exam': 'পরীক্ষা',
    'coursedetail.certificate.demo.label': 'সার্টিফিকেট প্রিভিউ',
    'coursedetail.certificate.demo.title': 'সপ্তাহ ১৬ শেষে — আপনার সার্টিফিকেট স্বয়ংক্রিয়ভাবে ইস্যু হবে',
    'coursedetail.certificate.demo.desc': 'সপ্তাহ ১৬-এর চূড়ান্ত পরীক্ষা শেষ করার সাথে সাথেই সিস্টেম স্বয়ংক্রিয়ভাবে আপনার নাম বসিয়ে সার্টিফিকেট তৈরি করবে — কোনো ম্যানুয়াল অনুরোধের প্রয়োজন নেই।',
    'coursedetail.certificate.of': 'সনদপত্র প্রদান করা হচ্ছে',
    'coursedetail.certificate.studentname': 'শিক্ষার্থীর নাম',
    'coursedetail.certificate.completion': 'উপরোক্ত ব্যক্তি সফলভাবে সম্পন্ন করেছেন',
    'coursedetail.certificate.auto': 'স্বয়ংক্রিয়ভাবে ইস্যুকৃত',
    'coursedetail.certificate.date': 'তারিখ',
    'coursedetail.certificate.signature': 'CEO ও প্রধান শিক্ষক',

    // Order / Contact form modal
    'form.buy.title': 'কোর্স অর্ডার করুন',
    'form.name': 'পুরো নাম',
    'form.phone': 'ফোন নম্বর',
    'form.email': 'ইমেইল',
    'form.course': 'কোর্সের নাম',
    'form.submit': 'WhatsApp-এ পাঠান',

    // Footer social
    'footer.social': 'আমাদের ফলো করুন',

    // About Page
    'aboutpage.title': 'FN Formation — আপনার ফরাসি শেখার সঙ্গী',
    'aboutpage.story.title': 'আমাদের গল্প',
    'aboutpage.story.desc': 'FN Formation ফরাসি ভাষা শিক্ষায় একটি নতুন দিগন্ত উন্মোচন করেছে। আমরা বিশ্বাস করি যে প্রতিটি মানুষের ফরাসি ভাষা শেখার সুযোগ থাকা উচিত, যেখানেই থাকুন না কেন। আমাদের অনলাইন প্ল্যাটফর্ম আপনাকে নিজের গতিতে ফরাসি শিখতে সাহায্য করে।',
    'aboutpage.mission.title': 'আমাদের লক্ষ্য',
    'aboutpage.mission.desc': 'ফরাসি ভাষা শিক্ষাকে সবার জন্য সহজলভ্য এবং কার্যকর করে তোলা। আমরা DELF পরীক্ষার্থীদের সর্বোচ্চ প্রস্তুতি নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ।',
    'aboutpage.team.title': 'আমাদের টীম',

    // Contact Page
    'contact.title': 'আমাদের সাথে যোগাযোগ করুন',
    'contact.whatsapp.title': 'WhatsApp',
    'contact.whatsapp.btn': 'চ্যাট শুরু করুন',
    'contact.email.title': 'Email',
    'contact.phone.title': 'Téléphone',
    'contact.address.title': 'Adresse',
    'contact.address': 'France',
    'contact.quick': 'যেকোনো প্রশ্নের জন্য আমাদের WhatsApp-ে মেসেজ করুন',

    // Portal Page
    'portal.title': 'আপনার লাইভ ক্লাস রেকর্ডিং',
    'portal.desc': 'আপনার লাইভ Zoom ক্লাসের রেকর্ডিং এখানে পাবেন',
    'portal.login.title': 'লগইন করুন',
    'portal.login.desc': 'আপনার ক্লাস রেকর্ডিং অ্যাক্সেস করতে লগইন করুন',
    'portal.login.btn': 'লগইন পেজে যান',
    'portal.all': 'সব রেকর্ডিং',
    'portal.welcome': 'স্বাগতম,',
    'portal.signout': 'লগআউট',

    // Connection Page
    'connection.title': 'আপনার অ্যাক্উন্টে লগইন করুন',
    'connection.welcome': 'স্বাগতম',
    'connection.email': 'ইমেইল',
    'connection.password': 'পাসওয়ার্ড',
    'connection.login': 'লগইন',
    'connection.or': 'অথবা',
    'connection.demo': 'ডেমো অ্যাক্সেস',
    'connection.forgot': 'পাসওয়ার্ড ভুলে গেছেন?',
    'connection.new': 'কোর্স কিনে অ্যাক্সেস পান',

    // Common
    'lang.bn': 'বাংলা',
    'lang.fr': 'Français',
    'price': '€৯৯',
    'eur': '€',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.courses': 'Nos Cours',
    'nav.about': 'À Propos',
    'nav.contact': 'Contact',
    'nav.portal': 'Portail Étudiant',
    'nav.connection': 'Connexion',

    // Hero
    'hero.label': 'ÉCOLE DE FRANÇAIS EN LIGNE',
    'hero.title': 'FN Formation',
    'hero.desc': 'Apprenez le français et réussissez votre examen DELF',
    'hero.btn1': 'VOIR NOS COURS',
    'hero.btn2': 'NOUS CONTACTER',

    // About
    'about.label': 'À PROPOS DE NOUS',
    'about.title': 'Votre Partenaire d\'Apprentissage du Français',
    'about.desc': 'FN Formation est une école de français en ligne spécialisée dans la préparation aux examens DELF. Nous nous engageons à vous rendre compétent en français grâce à nos enseignants expérimentés. Notre objectif est d\'aider chaque étudiant à atteindre ses objectifs.',
    'about.link': 'EN SAVOIR PLUS',
    'about.stat1.num': '500+',
    'about.stat1.label': 'Étudiants',
    'about.stat2.num': '5+',
    'about.stat2.label': 'Années d\'Expérience',
    'about.stat3.num': '98%',
    'about.stat3.label': 'Satisfaction',

    // Courses
    'courses.label': 'NOS COURS',
    'courses.title': 'Cours de Préparation DELF',
    'courses.desc': 'Nos cours de préparation DELF spécialisés vous aideront à atteindre vos objectifs',
    'courses.btn': 'VOIR TOUS LES COURS',
    'course.buy': 'ACHETER',

    // Course details
    'course.a1.title': 'Cours DELF A1',
    'course.a1.desc': 'Premiers pas en français. Acquérez les compétences de communication de base.',
    'course.a2.title': 'Cours DELF A2',
    'course.a2.desc': 'Niveau élémentaire. Parlez français dans des situations quotidiennes.',
    'course.b1.title': 'Cours DELF B1',
    'course.b1.desc': 'Niveau intermédiaire. Communiquez en français de manière autonome.',
    'course.b2.title': 'Cours DELF B2',
    'course.b2.desc': 'Niveau intermédiaire supérieur. Discutez avec assurance de sujets complexes.',

    // Why Choose Us
    'why.label': 'POURQUOI NOUS',
    'why.title': 'L\'Excellence à Chaque Étape',
    'why.1.title': 'Enseignants Expérimentés',
    'why.1.desc': 'Nos enseignants sont hautement qualifiés en français avec de nombreuses années d\'expérience.',
    'why.2.title': 'Programme de Qualité',
    'why.2.desc': 'Un syllabus spécialement conçu pour l\'examen DELF suivant le curriculum complet.',
    'why.3.title': 'Support Dédié',
    'why.3.desc': 'Support 24/7 et conseils personnels pour chaque étudiant.',
    'why.4.title': 'Taux de Réussite',
    'why.4.desc': '98% de nos étudiants réussissent l\'examen DELF du premier coup.',

    // Testimonials
    'trust.title': 'Ils Nous Font Confiance',

    // CTA
    'cta.title': 'Prêt à Commencer Votre Apprentissage du Français ?',
    'cta.desc': 'Nous avons des cours spécialisés pour les apprenants de français de tous niveaux. Contactez-nous dès aujourd\'hui !',
    'cta.whatsapp': 'CONTACTEZ-NOUS',

    // Footer
    'footer.tagline': 'Apprenez le français et conduisez vers le succès',
    'footer.nav': 'Navigation',
    'footer.legal': 'Informations Légales',
    'footer.siret': 'SIRET: 98259717100015',
    'footer.tva': 'TVA: FR9787348734',
    'footer.phone': 'Tél: +33 7 51 32 61 18',
    'footer.rights': '© 2026 FN Formation. Tous droits réservés.',
    'footer.privacy': 'Politique de Confidentialité',
    'footer.legal2': 'Mentions Légales',

    // Courses Page
    'coursespage.title': 'Cours de Préparation DELF',
    'coursespage.desc': 'Tous nos cours sont des vidéos pré-enregistrées diffusées sur YouTube',
    'coursespage.how': 'Comment Ça Marche',
    'coursespage.step1': 'Choisissez Votre Cours',
    'coursespage.step1d': 'Choisissez le bon cours DELF selon votre niveau.',
    'coursespage.step2': 'Payez en ligne en toute sécurité',
    'coursespage.step2d': 'Réglez le cours par carte bancaire directement sur le site.',
    'coursespage.step3': 'Commencez à Apprendre',
    'coursespage.step3d': 'Une fois le paiement confirmé, vous aurez accès au cours.',

    // Course card features
    'course.feature1': 'Vidéos pré-enregistrées',
    'course.feature2': 'Par des enseignants expérimentés',
    'course.feature3': 'Exercices et tests modèles',
    'course.feature4': 'Certificat',
    'course.buy2': 'ACHETER LE COURS',
    'course.demo': 'VOIR UNE DÉMO CLASSE',

    // Course detail page
    'coursedetail.back': 'Retour aux cours',
    'coursedetail.whatyoulearn': 'Ce que vous allez apprendre',
    'coursedetail.curriculum': 'Programme du cours',
    'coursedetail.requirements': 'Prérequis',
    'coursedetail.requirements.1': 'Aucune connaissance préalable du français n\'est requise',
    'coursedetail.requirements.2': 'Un ordinateur ou smartphone avec connexion internet',
    'coursedetail.requirements.3': 'Motivation et régularité dans le suivi des cours',
    'coursedetail.instructor': 'Enseignant',
    'coursedetail.enroll': 'S\'inscrire maintenant',
    'coursedetail.demo': 'Voir une démo classe',
    'coursedetail.duration': 'Durée',
    'coursedetail.lessons': 'Leçons',
    'coursedetail.level': 'Niveau',
    'coursedetail.includes': 'Ce cours comprend',
    'coursedetail.learn1': 'Vidéos de cours pré-enregistrées, disponibles à tout moment',
    'coursedetail.learn2': 'Exercices pratiques après chaque module',
    'coursedetail.learn3': 'Examens blancs dans les conditions du vrai DELF',
    'coursedetail.learn4': 'Un certificat de réussite en fin de parcours',
    'coursedetail.overview': 'Aperçu du cours',
    'coursedetail.weeks': 'semaines',
    'coursedetail.week': 'Semaine',
    'coursedetail.classes': 'classes',
    'coursedetail.certificate': 'Obtenez votre certificat',
    'coursedetail.certificate.desc': 'Dès que vous terminez la semaine 16, vous recevez automatiquement un certificat de réussite à ajouter à votre CV.',
    'coursedetail.enrolled': 'étudiants inscrits',
    'coursedetail.reviews': 'avis',
    'coursedetail.exam': 'Examen',
    'coursedetail.certificate.demo.label': 'Aperçu du certificat',
    'coursedetail.certificate.demo.title': 'Fin de la semaine 16 — votre certificat est délivré automatiquement',
    'coursedetail.certificate.demo.desc': "Dès que l'examen final de la semaine 16 est terminé, le système génère automatiquement votre certificat avec votre nom — aucune demande manuelle n'est nécessaire.",
    'coursedetail.certificate.of': 'Certificat de réussite',
    'coursedetail.certificate.studentname': "Nom de l'étudiant",
    'coursedetail.certificate.completion': 'A terminé avec succès le cours',
    'coursedetail.certificate.auto': 'Délivré automatiquement',
    'coursedetail.certificate.date': 'Date',
    'coursedetail.certificate.signature': 'CEO & Enseignant principal',

    // Order / Contact form modal
    'form.buy.title': 'Commander le cours',
    'form.name': 'Nom complet',
    'form.phone': 'Numéro de téléphone',
    'form.email': 'Email',
    'form.course': 'Nom du cours',
    'form.submit': 'Envoyer sur WhatsApp',

    // Footer social
    'footer.social': 'Suivez-nous',

    // About Page
    'aboutpage.title': 'FN Formation — Votre Partenaire d\'Apprentissage du Français',
    'aboutpage.story.title': 'Notre Histoire',
    'aboutpage.story.desc': 'FN Formation a ouvert un nouvel horizon dans l\'enseignement du français en ligne. Nous croyons que chacun devrait avoir la possibilité d\'apprendre le français, où qu\'il soit. Notre plateforme en ligne vous aide à apprendre le français à votre propre rythme.',
    'aboutpage.mission.title': 'Notre Mission',
    'aboutpage.mission.desc': 'Rendre l\'apprentissage du français accessible et efficace pour tous. Nous nous engageons à assurer la meilleure préparation possible aux candidats au DELF.',
    'aboutpage.team.title': 'Notre Équipe',

    // Contact Page
    'contact.title': 'Contactez-Nous',
    'contact.whatsapp.title': 'WhatsApp',
    'contact.whatsapp.btn': 'Démarrer le Chat',
    'contact.email.title': 'Email',
    'contact.phone.title': 'Téléphone',
    'contact.address.title': 'Adresse',
    'contact.address': 'France',
    'contact.quick': 'Envoyez-nous un message sur WhatsApp pour toute question',

    // Portal Page
    'portal.title': 'Vos Enregistrements de Cours en Direct',
    'portal.desc': 'Retrouvez ici les enregistrements de vos cours Zoom en direct',
    'portal.login.title': 'Connectez-Vous',
    'portal.login.desc': 'Connectez-vous pour accéder à vos enregistrements de cours',
    'portal.login.btn': 'ALLER À LA CONNEXION',
    'portal.all': 'Tous',
    'portal.welcome': 'Bienvenue,',
    'portal.signout': 'Déconnexion',

    // Connection Page
    'connection.title': 'Connectez-Vous à Votre Compte',
    'connection.welcome': 'Bienvenue',
    'connection.email': 'Email',
    'connection.password': 'Mot de passe',
    'connection.login': 'CONNEXION',
    'connection.or': 'OU',
    'connection.demo': 'ACCÈS DÉMO',
    'connection.forgot': 'Mot de passe oublié?',
    'connection.new': 'Acheter un cours pour un accès',

    // Common
    'lang.bn': 'বাংলা',
    'lang.fr': 'Français',
    'price': '€99',
    'eur': '€',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('bn');

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    document.documentElement.lang = newLang === 'bn' ? 'bn' : 'fr';
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[lang][key] || key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
