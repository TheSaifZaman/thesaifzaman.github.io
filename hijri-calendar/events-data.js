/* ═══════════════════════════════════════════════════════════════════════════════
   Hijri Calendar - Islamic Historical Events Database
   ═══════════════════════════════════════════════════════════════════════════════

   Data Structure:
   Key format: "month-day" (e.g., "1-10" = 10th Muharram)
   Each key maps to an array of event objects.

   Event object:
   {
       name:        (string) Event name in English
       nameAr:      (string) Event name in Arabic (optional)
       year:        (number|string|null) Year AH, or descriptive string
       category:    (string) battle|historical|birth|death|revelation|miracle|fasting|worship|celebration|treaty
       description: (string) Detailed description with significance and references
       reference:   (string) Source reference (optional)
   }

   Categories:
   - battle:      Military engagements and expeditions
   - historical:  Major historical milestones
   - birth:       Births of Prophets, Sahaba, and key figures
   - death:       Deaths and martyrdoms
   - revelation:  Quranic revelations and divine communications
   - miracle:     Miracles and supernatural events
   - fasting:     Recommended or obligatory fasting days
   - worship:     Special acts of worship, du'a, dhikr
   - celebration: Eid and festive occasions
   - treaty:      Treaties, pledges, and diplomatic events

   Sources referenced:
   - Ibn Kathir, Al-Bidaya wan-Nihaya
   - Ibn Hisham, As-Sirah an-Nabawiyyah
   - Sahih al-Bukhari & Sahih Muslim
   - At-Tabari, Tarikh ar-Rusul wal-Muluk
   - Ibn Sa'd, Kitab at-Tabaqat al-Kabir
   ═══════════════════════════════════════════════════════════════════════════════ */

var HIJRI_EVENTS = {

    // ═══════════════════════════════════════
    // MUHARRAM (Month 1) - The Sacred Month
    // ═══════════════════════════════════════

    "1-1": [
        {
            name: "Islamic New Year",
            nameAr: "رأس السنة الهجرية",
            year: null,
            category: "historical",
            description: "The first day of the Islamic calendar year. The Hijri calendar begins from the migration (Hijrah) of Prophet Muhammad (PBUH) from Makkah to Madinah in 622 CE. Umar ibn al-Khattab (RA) established this as the starting point of the Islamic calendar during his caliphate. Muharram is one of the four sacred months mentioned in the Quran (9:36) during which fighting is prohibited.",
            reference: "Sahih al-Bukhari; Quran 9:36"
        },
        {
            name: "Beginning of the Hijrah Journey",
            nameAr: "بداية رحلة الهجرة",
            year: "1 AH (622 CE)",
            category: "historical",
            description: "The Hijrah marks the migration of Prophet Muhammad (PBUH) and the early Muslims from Makkah to Madinah. This event was so pivotal that it became the starting point of the Islamic calendar. The Prophet (PBUH) and Abu Bakr (RA) hid in the Cave of Thawr for three days before completing the journey. The Hijrah established the first Islamic state and community (Ummah) in Madinah.",
            reference: "Ibn Hisham, As-Sirah an-Nabawiyyah"
        },
        {
            name: "Sacred Month of Muharram",
            nameAr: "شهر الله المحرم",
            year: null,
            category: "worship",
            description: "The Prophet (PBUH) said: 'The best fasting after Ramadan is the month of Allah, Muharram.' It is one of the four sacred months (Al-Ashhur al-Hurum) in which Allah has forbidden fighting. The other sacred months are Rajab, Dhul Qi'dah, and Dhul Hijjah.",
            reference: "Sahih Muslim 1163"
        }
    ],

    "1-2": [
        {
            name: "Husayn ibn Ali (RA) Departs for Kufa",
            nameAr: "خروج الحسين نحو الكوفة",
            year: "61 AH (680 CE)",
            category: "historical",
            description: "Husayn ibn Ali (RA), the grandson of Prophet Muhammad (PBUH), began his journey from Makkah toward Kufa after receiving letters of support from the people of Kufa. This journey would ultimately lead to the tragic events at Karbala. His stand represented a principled stance against injustice and tyranny.",
            reference: "At-Tabari, Tarikh ar-Rusul wal-Muluk"
        }
    ],

    "1-3": [
        {
            name: "Prophet Yusuf (AS) Released from Prison",
            nameAr: "خروج يوسف عليه السلام من السجن",
            year: null,
            category: "historical",
            description: "According to some scholars, Prophet Yusuf (Joseph, AS) was released from prison on this day after years of unjust imprisonment in Egypt. The King had a dream that none could interpret except Yusuf (AS), leading to his release and eventual appointment as treasurer of Egypt. His story, told in Surah Yusuf, is described by Allah as 'the best of stories' (Ahsan al-Qasas).",
            reference: "Quran 12:54-57; Ibn Kathir, Qisas al-Anbiya"
        }
    ],

    "1-7": [
        {
            name: "Siege of Karbala Begins",
            nameAr: "بداية حصار كربلاء",
            year: "61 AH (680 CE)",
            category: "historical",
            description: "The army of Yazid, led by Umar ibn Sa'd, cut off water supply to the camp of Husayn ibn Ali (RA) and his companions at Karbala. Despite the severe hardship, Husayn (RA) and his small band of about 72 followers refused to pledge allegiance to Yazid, standing firm on principle.",
            reference: "At-Tabari, Tarikh ar-Rusul wal-Muluk"
        }
    ],

    "1-9": [
        {
            name: "Tasu'a - Day Before Ashura",
            nameAr: "تاسوعاء",
            year: null,
            category: "fasting",
            description: "The Prophet (PBUH) said: 'If I live until next year, I will fast on the ninth day (along with the tenth).' It is recommended (mustahabb) to fast on the 9th along with the 10th of Muharram to differentiate from the practice of the People of the Book. Fasting these two days together is the most recommended way to observe Ashura.",
            reference: "Sahih Muslim 1134"
        }
    ],

    "1-10": [
        {
            name: "Day of Ashura",
            nameAr: "يوم عاشوراء",
            year: null,
            category: "fasting",
            description: "One of the most significant days in the Islamic calendar. The Prophet (PBUH) said: 'Fasting on the Day of Ashura, I hope Allah will expiate the sins of the year before it.' When he came to Madinah, he found the Jews fasting on this day and asked them why. They said: 'This is a great day when Allah saved Musa (Moses) and his people and drowned Pharaoh and his people.' The Prophet (PBUH) said: 'We have more right to Musa than you.'",
            reference: "Sahih al-Bukhari 2004; Sahih Muslim 1162"
        },
        {
            name: "Allah Saved Prophet Musa (AS) and Bani Israel",
            nameAr: "نجاة موسى عليه السلام",
            year: null,
            category: "miracle",
            description: "On this day, Allah parted the Red Sea for Prophet Musa (Moses, AS) and the Children of Israel, saving them from the pursuing army of Pharaoh (Fir'awn). Pharaoh and his entire army were drowned as the sea closed upon them. This is one of the greatest miracles mentioned in the Quran, demonstrating Allah's power to save the believers and destroy the oppressors. Pharaoh's body was preserved as a sign for future generations.",
            reference: "Quran 26:63-66; Quran 10:90-92"
        },
        {
            name: "Prophet Nuh's (AS) Ark Rested on Mount Judi",
            nameAr: "استواء سفينة نوح على الجودي",
            year: null,
            category: "miracle",
            description: "According to many scholars, the Ark of Prophet Nuh (Noah, AS) came to rest on Mount Judi on this day, marking the end of the great flood that Allah sent to punish the disbelieving people. Prophet Nuh (AS) had preached to his people for 950 years before the flood. Only those who believed and boarded the Ark were saved. It was said: 'O earth, swallow your water, and O sky, withhold [your rain].'",
            reference: "Quran 11:44; Ibn Kathir, Al-Bidaya wan-Nihaya"
        },
        {
            name: "Martyrdom of Husayn ibn Ali (RA) at Karbala",
            nameAr: "استشهاد الحسين بن علي رضي الله عنه",
            year: "61 AH (680 CE)",
            category: "death",
            description: "Husayn ibn Ali (RA), the beloved grandson of Prophet Muhammad (PBUH), was martyred at Karbala along with 72 of his companions and family members by the forces of Yazid ibn Mu'awiyah. The Prophet (PBUH) had said about Hasan and Husayn: 'They are my two fragrant flowers (rayhanatay) from this world.' This tragic event remains one of the most mourned events in Islamic history and a lasting symbol of standing against injustice.",
            reference: "At-Tabari; Sahih al-Bukhari 3753"
        },
        {
            name: "Prophet Adam's (AS) Repentance Accepted",
            nameAr: "قبول توبة آدم عليه السلام",
            year: null,
            category: "historical",
            description: "According to some narrations, Allah accepted the repentance of Prophet Adam (AS) on the Day of Ashura. After eating from the forbidden tree in Paradise, Adam and Hawwa (Eve) were sent down to earth. Adam (AS) prayed for forgiveness, saying: 'Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.' Allah, the Most Merciful, accepted their repentance.",
            reference: "Quran 7:23; Various tafsir sources"
        },
        {
            name: "Prophet Ibrahim (AS) Saved from the Fire",
            nameAr: "نجاة إبراهيم عليه السلام من النار",
            year: null,
            category: "miracle",
            description: "Some scholars narrate that Prophet Ibrahim (Abraham, AS) was saved from the fire of Nimrod on this day. When Ibrahim (AS) destroyed the idols and was thrown into a massive fire, Allah commanded: 'O fire, be coolness and safety upon Ibrahim.' The fire did not harm him at all, becoming a miracle that demonstrated Allah's absolute power over His creation.",
            reference: "Quran 21:68-69; Ibn Kathir, Qisas al-Anbiya"
        }
    ],

    "1-11": [
        {
            name: "Fasting 11th Muharram Recommended",
            nameAr: "صيام الحادي عشر من محرم",
            year: null,
            category: "fasting",
            description: "Some scholars recommend fasting the 11th of Muharram along with the 9th and 10th, based on the hadith: 'Fast a day before it (Ashura) and a day after it.' This three-day fast (9th, 10th, 11th) is considered the most complete way to observe the Ashura fast.",
            reference: "Musnad Ahmad; Ibn al-Qayyim, Zad al-Ma'ad"
        }
    ],

    "1-12": [
        {
            name: "Battle of Khaybar Preparations",
            nameAr: "التجهيز لغزوة خيبر",
            year: "7 AH (628 CE)",
            category: "historical",
            description: "The Muslim army under Prophet Muhammad (PBUH) began preparations for the expedition to Khaybar, a heavily fortified Jewish stronghold north of Madinah. The Jews of Khaybar had been conspiring against the Muslims and had played a role in organizing the Battle of the Trench (Khandaq). The conquest of Khaybar was a significant military victory that neutralized a major threat.",
            reference: "Ibn Hisham, As-Sirah an-Nabawiyyah"
        }
    ],

    "1-15": [
        {
            name: "Qiblah Changed from Jerusalem to Makkah",
            nameAr: "تحويل القبلة",
            year: "2 AH (624 CE)",
            category: "revelation",
            description: "According to one scholarly opinion, the Qiblah (direction of prayer) was changed from Bayt al-Maqdis (Jerusalem) to the Ka'bah in Makkah around mid-Muharram or mid-Sha'ban 2 AH. This was a momentous event. The Prophet (PBUH) had been looking toward the sky, hoping for this change, and Allah revealed: 'We have certainly seen the turning of your face toward the heaven, and We will surely turn you to a qiblah with which you will be pleased. So turn your face toward al-Masjid al-Haram.'",
            reference: "Quran 2:144; Sahih al-Bukhari"
        }
    ],

    "1-20": [
        {
            name: "Death of Bilal ibn Rabah (RA)",
            nameAr: "وفاة بلال بن رباح رضي الله عنه",
            year: "20 AH (641 CE)",
            category: "death",
            description: "Bilal ibn Rabah (RA), the first muezzin (caller to prayer) in Islam, passed away in Damascus. He was an Abyssinian slave who was among the earliest converts to Islam and endured severe torture under Umayyah ibn Khalaf — who would place a heavy boulder on his chest in the scorching heat — yet Bilal kept repeating 'Ahad, Ahad' (One, One), affirming the oneness of Allah. Abu Bakr (RA) purchased and freed him. After the Prophet's death, Bilal was so grief-stricken he could not give the Adhan without weeping.",
            reference: "Ibn Sa'd, Kitab at-Tabaqat; Sahih al-Bukhari"
        }
    ],

    "1-25": [
        {
            name: "Death of Umar ibn Abd al-Aziz",
            nameAr: "وفاة عمر بن عبد العزيز",
            year: "101 AH (720 CE)",
            category: "death",
            description: "Umar ibn Abd al-Aziz (RA), the eighth Umayyad Caliph, passed away. Known as the 'Fifth Rightly-Guided Caliph,' he is celebrated for his justice, piety, and reforms. He reversed many unjust policies, returned confiscated properties, and established a treasury system that eliminated poverty during his reign. He ruled for only about 2.5 years but left an indelible mark on Islamic governance.",
            reference: "Ibn Sa'd, Kitab at-Tabaqat; Ibn Kathir, Al-Bidaya wan-Nihaya"
        }
    ],

    // ═══════════════════════════════════════
    // SAFAR (Month 2)
    // ═══════════════════════════════════════

    "2-1": [
        {
            name: "Beginning of the Month of Safar",
            nameAr: "بداية شهر صفر",
            year: null,
            category: "historical",
            description: "Safar is the second month of the Islamic calendar. In pre-Islamic Arabia, it was considered an unlucky month, but the Prophet (PBUH) abolished this superstition. He said: 'There is no (superstitious belief in) contagion, no (evil omen in) the month of Safar, and no haamah (a pre-Islamic superstition about owls).' Muslims are encouraged to put their trust in Allah alone.",
            reference: "Sahih al-Bukhari 5757; Sahih Muslim 2220"
        }
    ],

    "2-12": [
        {
            name: "Battle of al-Abwa (Waddan)",
            nameAr: "غزوة الأبواء (ودان)",
            year: "2 AH (623 CE)",
            category: "battle",
            description: "The first military expedition (ghazwah) personally led by Prophet Muhammad (PBUH). He set out with 70 Muhajirin toward Waddan to intercept a Quraysh trade caravan. Though no fighting occurred, the expedition established a non-aggression treaty with the Banu Damra tribe. It marked the beginning of the Prophet's military campaigns to protect the Muslim community.",
            reference: "Ibn Hisham, As-Sirah an-Nabawiyyah; Ibn Sa'd"
        }
    ],

    "2-17": [
        {
            name: "Death of Ali ibn Abi Talib (RA)",
            nameAr: "استشهاد علي بن أبي طالب رضي الله عنه",
            year: "40 AH (661 CE)",
            category: "death",
            description: "According to some narrations, Ali ibn Abi Talib (RA), the fourth Rightly-Guided Caliph, cousin and son-in-law of the Prophet (PBUH), was struck by the Kharijite Abd al-Rahman ibn Muljam while praying Fajr in the mosque of Kufa on 19 Ramadan 40 AH, and passed away two days later (though many sources place his death in Ramadan). Ali (RA) was known for his bravery, knowledge, and justice. The Prophet (PBUH) said: 'I am the city of knowledge and Ali is its gate.'",
            reference: "Ibn Sa'd, Kitab at-Tabaqat; Various hadith collections"
        }
    ],

    "2-20": [
        {
            name: "Prophet Muhammad (PBUH) Arrives in Madinah",
            nameAr: "وصول النبي إلى المدينة",
            year: "1 AH (622 CE)",
            category: "historical",
            description: "According to some historians, Prophet Muhammad (PBUH) arrived in Madinah on this date (though the most accepted view is 12 Rabi al-Awwal). The people of Madinah (the Ansar) had been eagerly waiting, going out daily to look for the Prophet's arrival. When he finally came, the whole city celebrated with joy. The children sang: 'Tala'al-Badru Alayna' (The full moon has risen upon us).",
            reference: "Ibn Hisham, As-Sirah an-Nabawiyyah"
        }
    ],

    "2-27": [
        {
            name: "Death of Salahuddin al-Ayyubi",
            nameAr: "وفاة صلاح الدين الأيوبي",
            year: "589 AH (1193 CE)",
            category: "death",
            description: "The legendary Muslim commander Salahuddin Yusuf ibn Ayyub (Saladin) passed away in Damascus at the age of 56. He is best known for liberating Jerusalem from the Crusaders in 583 AH (1187 CE) after 88 years of Crusader occupation. Despite his military might, Salahuddin was known for his chivalry, generosity, and mercy — even his enemies praised his character. At the time of his death, he had given away so much in charity that he did not have enough money to pay for his own funeral.",
            reference: "Ibn Kathir, Al-Bidaya wan-Nihaya; Baha al-Din ibn Shaddad, Sirat Salahuddin"
        }
    ],

    "2-26": [
        {
            name: "Expedition of Buwat",
            nameAr: "غزوة بواط",
            year: "2 AH (623 CE)",
            category: "battle",
            description: "The Prophet (PBUH) led 200 men to intercept a large Quraysh caravan of 100 men and 2,500 camels led by Umayyah ibn Khalaf near Buwat on the road to Syria. The caravan managed to evade the Muslim force. This was one of the early defensive expeditions aimed at establishing Muslim security and deterring Quraysh aggression.",
            reference: "Ibn Hisham, As-Sirah an-Nabawiyyah"
        }
    ],

    "2-28": [
        {
            name: "Battle of Khaybar",
            nameAr: "غزوة خيبر",
            year: "7 AH (628 CE)",
            category: "battle",
            description: "The Muslim army conquered the fortress of Khaybar, a strongly fortified Jewish settlement north of Madinah. The Prophet (PBUH) gave the banner to Ali ibn Abi Talib (RA), saying: 'Tomorrow I will give the flag to a man who loves Allah and His Messenger and whom Allah and His Messenger love.' Ali (RA) led the assault and conquered the main fortress. This victory ended the threat from Khaybar and brought significant resources to the Muslim community.",
            reference: "Sahih al-Bukhari 4210; Ibn Hisham"
        }
    ],

    // ═══════════════════════════════════════
    // RABI AL-AWWAL (Month 3) - Month of the Prophet's Birth
    // ═══════════════════════════════════════

    "3-1": [
        {
            name: "Hijrah - Migration to Madinah Begins",
            nameAr: "بداية الهجرة النبوية",
            year: "1 AH (622 CE)",
            category: "historical",
            description: "The Prophet (PBUH) and Abu Bakr (RA) departed from the Cave of Thawr after hiding for three days. They began their journey northward to Yathrib (later named Madinah). The journey took about 8 days via a less-traveled route to avoid the Quraysh search parties. Suraqah ibn Malik attempted to capture them for the bounty but his horse kept sinking into the sand — a miraculous sign.",
            reference: "Sahih al-Bukhari 3905; Ibn Hisham"
        }
    ],

    "3-8": [
        {
            name: "Death of Imam Hasan al-Askari",
            nameAr: "وفاة الإمام حسن العسكري",
            year: "260 AH (874 CE)",
            category: "death",
            description: "Hasan ibn Ali al-Askari, a descendant of Prophet Muhammad (PBUH) through the line of Husayn (RA), passed away in Samarra, Iraq. He was a renowned scholar and pious figure.",
            reference: "Ibn Kathir, Al-Bidaya wan-Nihaya"
        }
    ],

    "3-9": [
        {
            name: "Prophet Muhammad (PBUH) Arrives at Quba",
            nameAr: "وصول النبي إلى قباء",
            year: "1 AH (622 CE)",
            category: "historical",
            description: "The Prophet (PBUH) arrived at Quba, on the outskirts of Madinah, during the Hijrah. He stayed there for several days and established Masjid Quba — the first mosque in Islam. Allah says about this mosque: 'A mosque founded on righteousness from the first day is more worthy for you to stand in' (Quran 9:108). The Prophet (PBUH) used to visit Masjid Quba every Saturday to pray there.",
            reference: "Sahih al-Bukhari; Sahih Muslim; Quran 9:108"
        }
    ],

    "3-12": [
        {
            name: "Birth of Prophet Muhammad (PBUH)",
            nameAr: "مولد النبي محمد ﷺ",
            year: "53 BH (570 CE)",
            category: "birth",
            description: "Prophet Muhammad (PBUH) was born on Monday, 12 Rabi al-Awwal in the Year of the Elephant ('Aam al-Fil) in Makkah. He was born to Abdullah ibn Abd al-Muttalib and Aminah bint Wahb. His father had died before his birth. He was from the noble tribe of Quraysh, the clan of Banu Hashim. At his birth, his mother saw a light that illuminated the palaces of Syria. He was initially nursed by Thuwaybah and then by Halimah al-Sa'diyah in the desert among Banu Sa'd.",
            reference: "Ibn Hisham, As-Sirah an-Nabawiyyah; Ibn Kathir"
        },
        {
            name: "Death of Prophet Muhammad (PBUH)",
            nameAr: "وفاة النبي محمد ﷺ",
            year: "11 AH (632 CE)",
            category: "death",
            description: "The Prophet Muhammad (PBUH) passed away on Monday, 12 Rabi al-Awwal 11 AH in Madinah, in the room of his wife Aisha (RA). His last words were: 'With the highest companion (Ar-Rafiq al-A'la).' His death caused immense grief. Abu Bakr (RA) addressed the people saying: 'Whoever worshipped Muhammad, let him know that Muhammad has died, and whoever worshipped Allah, let him know that Allah is Ever-Living and never dies.' He recited: 'Muhammad is not but a messenger. [Other] messengers have passed on before him' (Quran 3:144).",
            reference: "Sahih al-Bukhari 4452; Quran 3:144"
        },
        {
            name: "Arrival of Prophet Muhammad (PBUH) in Madinah",
            nameAr: "وصول النبي إلى المدينة",
            year: "1 AH (622 CE)",
            category: "historical",
            description: "Prophet Muhammad (PBUH) entered Madinah to a jubilant welcome from the Ansar (helpers). The women and children sang the famous nasheed 'Tala'al-Badru Alayna' (The full moon has risen over us from the valley of Wada'). His she-camel, Qaswa, was left to walk freely and knelt at the place where Masjid an-Nabawi (the Prophet's Mosque) would later be built. This day marks the beginning of the Islamic civilization in Madinah.",
            reference: "Ibn Hisham; At-Tabari"
        }
    ],

    "3-13": [
        {
            name: "Abu Bakr as-Siddiq (RA) Becomes Caliph",
            nameAr: "خلافة أبي بكر الصديق",
            year: "11 AH (632 CE)",
            category: "historical",
            description: "Abu Bakr as-Siddiq (RA) was chosen as the first Caliph (successor) of the Prophet Muhammad (PBUH) at the Saqifah Bani Sa'idah gathering, the day after the Prophet's death. He was the closest companion of the Prophet, who had said: 'If I were to take a khalil (intimate friend) other than my Lord, I would take Abu Bakr.' His caliphate lasted about 2 years and 3 months, during which he united the Arabian Peninsula and launched the early Islamic conquests.",
            reference: "Sahih al-Bukhari 3659; Ibn Hisham"
        }
    ],

    "3-17": [
        {
            name: "Birth of Prophet Ibrahim (AS) - One Narration",
            nameAr: "مولد إبراهيم عليه السلام",
            year: null,
            category: "birth",
            description: "Some scholars place the birth of Prophet Ibrahim (Abraham, AS) in this month. He is the father of the Prophets, the forefather of both the Arab and Hebrew prophetic lines through his sons Isma'il and Is'haq (Ishmael and Isaac). He is called Khalilullah — the Friend of Allah. Ibrahim (AS) was born in Ur (modern-day Iraq) during the reign of the tyrant Nimrod.",
            reference: "Ibn Kathir, Qisas al-Anbiya"
        }
    ],

    "3-20": [
        {
            name: "Siege of Banu Nadir",
            nameAr: "حصار بني النضير",
            year: "4 AH (625 CE)",
            category: "battle",
            description: "The Jewish tribe of Banu Nadir attempted to assassinate Prophet Muhammad (PBUH) by dropping a boulder on him while he sat by their wall. Angel Jibreel warned the Prophet, who left immediately. The Prophet (PBUH) then besieged them for 15 days. They eventually agreed to leave Madinah, taking their movable possessions. Surah al-Hashr (Chapter 59) was revealed about this event: 'It is He who expelled the ones who disbelieved among the People of the Scripture from their homes at the first gathering' (Quran 59:2).",
            reference: "Quran 59:1-17; Ibn Hisham"
        }
    ],

    "3-23": [
        {
            name: "First Pledge of Aqabah",
            nameAr: "بيعة العقبة الأولى",
            year: "12 BH (621 CE)",
            category: "treaty",
            description: "Twelve men from Yathrib (Madinah) met the Prophet (PBUH) secretly at Aqabah during the Hajj season and pledged allegiance to him. They pledged not to associate anything with Allah, not to steal, not to commit adultery, not to kill their children, and to obey the Prophet in all good things. This was the first formal acceptance of Islam by the people of Madinah and paved the way for the Hijrah. The Prophet (PBUH) sent Mus'ab ibn Umayr (RA) with them as the first Islamic teacher to Madinah.",
            reference: "Ibn Hisham, As-Sirah an-Nabawiyyah; Sahih al-Bukhari"
        }
    ],

    // ═══════════════════════════════════════
    // RABI AL-THANI (Month 4)
    // ═══════════════════════════════════════

    "4-5": [
        {
            name: "Expedition of Hamza ibn Abd al-Muttalib",
            nameAr: "سرية حمزة بن عبد المطلب",
            year: "1 AH (623 CE)",
            category: "battle",
            description: "Hamza ibn Abd al-Muttalib (RA), the uncle of the Prophet (PBUH) known as the 'Lion of Allah' (Asadullah), led the first military expedition (sariyyah) in Islam with 30 Muhajirin to intercept a Quraysh caravan near the coast. Though no fighting occurred due to mediation, it demonstrated the growing military capability of the Muslims.",
            reference: "Ibn Hisham, As-Sirah an-Nabawiyyah"
        }
    ],

    "4-8": [
        {
            name: "Death of Imam Hasan ibn Ali (RA)",
            nameAr: "وفاة الحسن بن علي رضي الله عنه",
            year: "50 AH (670 CE)",
            category: "death",
            description: "Hasan ibn Ali (RA), the elder grandson of Prophet Muhammad (PBUH), passed away in Madinah. The Prophet (PBUH) had said about him: 'This grandson of mine is a sayyid (chief) and Allah will reconcile through him two great groups of Muslims.' This prophecy was fulfilled when Hasan (RA) made peace with Mu'awiyah to prevent further bloodshed among Muslims, reunifying the Ummah.",
            reference: "Sahih al-Bukhari 2704"
        }
    ],

    "4-11": [
        {
            name: "Death of Abd al-Qadir al-Jilani",
            nameAr: "وفاة عبد القادر الجيلاني",
            year: "561 AH (1166 CE)",
            category: "death",
            description: "Shaykh Abd al-Qadir al-Jilani, one of the most revered scholars and saints in Islamic history, passed away in Baghdad. He was a prolific preacher, jurist, and mystic whose teachings influenced millions. His school in Baghdad attracted students from across the Muslim world. His famous work 'Al-Ghunya li-Talibi Tariq al-Haqq' remains widely studied.",
            reference: "Ibn Kathir, Al-Bidaya wan-Nihaya"
        }
    ],

    // ═══════════════════════════════════════
    // JUMADA AL-ULA (Month 5)
    // ═══════════════════════════════════════

    "5-5": [
        {
            name: "Battle of Mu'tah",
            nameAr: "غزوة مؤتة",
            year: "8 AH (629 CE)",
            category: "battle",
            description: "The Battle of Mu'tah was the first major military engagement between the Muslims and the Byzantine (Roman) Empire, fought near the village of Mu'tah in modern-day Jordan. The Prophet (PBUH) appointed Zayd ibn Harithah (RA) as commander, with Ja'far ibn Abi Talib (RA) and Abdullah ibn Rawahah (RA) as successive commanders if he fell. All three were martyred in sequence. Khalid ibn al-Walid (RA) then took command and brilliantly maneuvered the retreat, saving the Muslim army. The Prophet (PBUH) named him 'Sayfullah' (Sword of Allah).",
            reference: "Sahih al-Bukhari 4261; Ibn Hisham"
        },
        {
            name: "Birth of Zaynab bint Ali (RA)",
            nameAr: "مولد زينب بنت علي رضي الله عنها",
            year: "5 AH (627 CE)",
            category: "birth",
            description: "Zaynab (RA), granddaughter of Prophet Muhammad (PBUH) and daughter of Ali (RA) and Fatimah (RA), was born in Madinah. She became one of the most courageous and eloquent women in Islamic history. After the Battle of Karbala, where her brother Husayn (RA) was martyred, Zaynab delivered powerful speeches in the courts of Kufa and Damascus, exposing the injustice of Yazid's regime and preserving the message of Karbala for future generations.",
            reference: "Ibn Kathir; Various Sirah sources"
        }
    ],

    "5-7": [
        {
            name: "Martyrdom of Ja'far ibn Abi Talib (RA)",
            nameAr: "استشهاد جعفر بن أبي طالب",
            year: "8 AH (629 CE)",
            category: "death",
            description: "Ja'far ibn Abi Talib (RA), the cousin of Prophet Muhammad (PBUH) and brother of Ali (RA), was martyred at the Battle of Mu'tah. He held the banner after Zayd ibn Harithah fell and fought valiantly. Both his arms were cut off as he held the banner between his stumps. The Prophet (PBUH) said: 'Allah has replaced his two arms with two wings with which he flies in Paradise wherever he wishes,' earning him the title 'Ja'far at-Tayyar' (Ja'far the Flyer).",
            reference: "Sahih al-Bukhari 4264"
        }
    ],

    "5-15": [
        {
            name: "Death of Khadijah bint Khuwaylid (RA)",
            nameAr: "وفاة خديجة بنت خويلد",
            year: "10 BH (619 CE)",
            category: "death",
            description: "Khadijah (RA), the first wife of Prophet Muhammad (PBUH) and the first person to accept Islam, passed away during the 'Year of Sorrow.' She was 65 years old. Khadijah (RA) supported the Prophet (PBUH) when no one else did, spending her entire wealth for the cause of Islam. The Prophet (PBUH) said: 'The best of its women is Maryam bint Imran, and the best of its women is Khadijah bint Khuwaylid.' Angel Jibreel brought her greetings of peace from Allah and gave her glad tidings of a palace in Paradise.",
            reference: "Sahih al-Bukhari 3815-3818; Sahih Muslim"
        }
    ],

    "5-18": [
        {
            name: "Conquest of Constantinople",
            nameAr: "فتح القسطنطينية",
            year: "857 AH (1453 CE)",
            category: "battle",
            description: "Sultan Muhammad al-Fatih (Mehmed II), at age 21, conquered Constantinople after a 53-day siege, fulfilling a prophecy attributed to the Prophet (PBUH): 'You will certainly conquer Constantinople. How blessed is the commander who conquers it, and how blessed is his army.' This ended the 1,100-year Byzantine Empire and established Istanbul as the Ottoman capital. The Sultan used massive cannons and a brilliant tactic of transporting ships overland to bypass the chain barrier.",
            reference: "Musnad Ahmad 14:331; Ibn Kathir, Al-Bidaya wan-Nihaya"
        }
    ],

    "5-20": [
        {
            name: "Death of Abu Talib",
            nameAr: "وفاة أبي طالب",
            year: "10 BH (619 CE)",
            category: "death",
            description: "Abu Talib, the uncle and protector of Prophet Muhammad (PBUH), died during the 'Year of Sorrow' ('Aam al-Huzn), shortly after or before Khadijah (RA). Despite never accepting Islam, Abu Talib had shielded the Prophet from the persecution of the Quraysh for decades. His death removed the tribal protection the Prophet had enjoyed, leading to intensified persecution and eventually the Hijrah to Madinah.",
            reference: "Ibn Hisham, As-Sirah an-Nabawiyyah"
        }
    ],

    // ═══════════════════════════════════════
    // JUMADA AL-THANI (Month 6)
    // ═══════════════════════════════════════

    "6-3": [
        {
            name: "Death of Fatimah az-Zahra (RA)",
            nameAr: "وفاة فاطمة الزهراء رضي الله عنها",
            year: "11 AH (632 CE)",
            category: "death",
            description: "Fatimah (RA), the daughter of Prophet Muhammad (PBUH) and Khadijah (RA), passed away approximately six months after her father. She is known as 'az-Zahra' (the Radiant) and 'Sayyidat Nisa al-Jannah' (the Chief of the Women of Paradise). The Prophet (PBUH) said: 'Fatimah is a part of me; whoever angers her angers me.' She was the mother of Hasan and Husayn (RA) and the wife of Ali ibn Abi Talib (RA).",
            reference: "Sahih al-Bukhari 3714; Sahih Muslim"
        }
    ],

    "6-7": [
        {
            name: "Death of Abu Bakr as-Siddiq (RA)",
            nameAr: "وفاة أبي بكر الصديق رضي الله عنه",
            year: "13 AH (634 CE)",
            category: "death",
            description: "Abu Bakr as-Siddiq (RA), the first Caliph of Islam and the closest companion of the Prophet (PBUH), passed away at the age of 63 — the same age as the Prophet. During his short caliphate of about 2 years, he successfully united Arabia, defeated the apostasy movements (Riddah Wars), compiled the first complete written manuscript of the Quran, and launched the early Islamic conquests into Persia and the Byzantine Empire. He was buried next to the Prophet (PBUH) in Madinah.",
            reference: "Sahih al-Bukhari; At-Tabari"
        }
    ],

    "6-10": [
        {
            name: "Battle of Jamal (Battle of the Camel)",
            nameAr: "معركة الجمل",
            year: "36 AH (656 CE)",
            category: "battle",
            description: "The Battle of Jamal took place near Basra, Iraq, between the forces of Caliph Ali ibn Abi Talib (RA) and an army led by Talha (RA), Zubayr (RA), and Aisha (RA), who were seeking justice for the murder of Caliph Uthman (RA). It was called the 'Battle of the Camel' because the fighting centered around the camel on which Aisha (RA) was riding. Both Talha and Zubayr were killed. After the battle, Ali (RA) treated Aisha (RA) with great respect and escorted her safely to Madinah. This was the first major civil conflict among the Sahaba.",
            reference: "At-Tabari, Tarikh ar-Rusul wal-Muluk; Ibn Kathir"
        }
    ],

    "6-13": [
        {
            name: "Birth of Umar ibn al-Khattab (RA)",
            nameAr: "مولد عمر بن الخطاب",
            year: "40 BH (584 CE)",
            category: "birth",
            description: "Umar ibn al-Khattab (RA), the second Rightly-Guided Caliph, was born in Makkah. Known as 'Al-Faruq' (the one who distinguishes truth from falsehood), his conversion to Islam was a major turning point. The Prophet (PBUH) had prayed: 'O Allah, strengthen Islam with either Umar ibn al-Khattab or Abu Jahl ibn Hisham.' Umar's caliphate (634-644 CE) saw the greatest expansion of the Islamic state, conquering Persia and much of the Byzantine Empire.",
            reference: "Ibn Sa'd, Kitab at-Tabaqat; Sahih al-Bukhari"
        }
    ],

    // ═══════════════════════════════════════
    // RAJAB (Month 7) - Sacred Month
    // ═══════════════════════════════════════

    "7-1": [
        {
            name: "Sacred Month of Rajab Begins",
            nameAr: "بداية شهر رجب",
            year: null,
            category: "worship",
            description: "Rajab is one of the four sacred months (Al-Ashhur al-Hurum) in Islam. The Prophet (PBUH) used to say when Rajab began: 'Allahumma barik lana fi Rajab wa Sha'ban, wa ballighna Ramadan' (O Allah, bless us in Rajab and Sha'ban, and let us reach Ramadan). Fighting was prohibited in this month even before Islam, and it remains a month of increased worship and preparation for Ramadan.",
            reference: "Musnad Ahmad; Narrated by Anas ibn Malik"
        }
    ],

    "7-5": [
        {
            name: "Expedition of Tabuk",
            nameAr: "غزوة تبوك",
            year: "9 AH (630 CE)",
            category: "battle",
            description: "The last military expedition led by Prophet Muhammad (PBUH). The Muslim army of 30,000 marched to Tabuk in northern Arabia to confront the Byzantine (Roman) Empire, which was reportedly gathering forces. Despite extreme heat, scarcity of provisions, and a long journey, the Sahaba responded to the Prophet's call. The Quran refers to this as 'the hour of difficulty' (Quran 9:117). The Byzantines did not engage, and several northern tribes submitted to Muslim authority. Three sincere Sahaba who stayed behind — Ka'b ibn Malik, Murarah ibn Rabi'ah, and Hilal ibn Umayyah — were boycotted for 50 days before Allah accepted their repentance.",
            reference: "Quran 9:38-42, 9:117-118; Sahih al-Bukhari 4418"
        }
    ],

    "7-10": [
        {
            name: "Birth of Prophet Muhammad's Son Ibrahim",
            nameAr: "مولد إبراهيم ابن النبي",
            year: "8 AH (630 CE)",
            category: "birth",
            description: "Ibrahim, the son of Prophet Muhammad (PBUH) and Mariyah al-Qibtiyyah, was born in Madinah. The Prophet (PBUH) was overjoyed at his birth and named him after Prophet Ibrahim (AS). Sadly, Ibrahim passed away at the age of about 18 months. A solar eclipse occurred on the day of his death, and people attributed it to his death, but the Prophet (PBUH) said: 'The sun and the moon are two signs of Allah; they are not eclipsed for the death of anyone.'",
            reference: "Sahih al-Bukhari 1043; Sahih Muslim"
        }
    ],

    "7-13": [
        {
            name: "Birth of Ali ibn Abi Talib (RA)",
            nameAr: "مولد علي بن أبي طالب",
            year: "23 BH (600 CE)",
            category: "birth",
            description: "Ali ibn Abi Talib (RA), the cousin and son-in-law of Prophet Muhammad (PBUH), was born inside the Ka'bah — a unique distinction. He was the first male and among the first people to accept Islam. He married Fatimah (RA), the daughter of the Prophet, and became the fourth Rightly-Guided Caliph. Known for his extraordinary knowledge, bravery, and eloquence, the Prophet (PBUH) said: 'I am the city of knowledge and Ali is its gate.'",
            reference: "Al-Hakim, Al-Mustadrak; Ibn Sa'd"
        }
    ],

    "7-12": [
        {
            name: "Battle of Yarmouk",
            nameAr: "معركة اليرموك",
            year: "15 AH (636 CE)",
            category: "battle",
            description: "One of the most decisive battles in world history. The Muslim army of approximately 36,000 under Khalid ibn al-Walid (RA) defeated a Byzantine army of 100,000-200,000 at the Yarmouk River (modern-day Jordan-Syria border). This battle effectively ended Byzantine rule in the Levant and opened the gates of Syria, Palestine, and eventually Egypt to Islam. Khalid (RA) employed brilliant military tactics, and the Muslim women, led by Khawlah bint al-Azwar, fought valiantly when the men were pushed back.",
            reference: "At-Tabari; Ibn Kathir, Al-Bidaya wan-Nihaya"
        }
    ],

    "7-15": [
        {
            name: "Qiblah Changed to Ka'bah - Another Narration",
            nameAr: "تحويل القبلة إلى الكعبة",
            year: "2 AH (624 CE)",
            category: "revelation",
            description: "According to another scholarly opinion, mid-Rajab is when the Qiblah was changed from Bayt al-Maqdis (Jerusalem) to the Sacred Mosque (Ka'bah) in Makkah. The Prophet (PBUH) had been praying toward Jerusalem for about 16-17 months after the Hijrah. This change was significant in establishing Islamic identity distinct from the People of the Book.",
            reference: "Quran 2:142-150"
        }
    ],

    "7-22": [
        {
            name: "Liberation of Jerusalem by Salahuddin",
            nameAr: "تحرير القدس على يد صلاح الدين",
            year: "583 AH (1187 CE)",
            category: "battle",
            description: "Salahuddin al-Ayyubi (Saladin) liberated Jerusalem (Bayt al-Maqdis) from the Crusaders after 88 years of occupation. Unlike the Crusader conquest of 1099, which involved mass slaughter, Salahuddin showed remarkable mercy — he allowed the Christian inhabitants to leave peacefully, freed prisoners, and protected churches and holy sites. He personally stationed guards to prevent any violence against civilians. This liberation is one of the proudest moments in Islamic history.",
            reference: "Ibn al-Athir, Al-Kamil fi al-Tarikh; Baha al-Din ibn Shaddad"
        }
    ],

    "7-26": [
        {
            name: "Death of Abu Talib - Another Narration",
            nameAr: "وفاة أبي طالب",
            year: "10 BH (619 CE)",
            category: "death",
            description: "Some historians place the death of Abu Talib, the Prophet's protective uncle, in Rajab rather than in Jumada al-Ula. Regardless of the exact date, his death was devastating for the Prophet (PBUH) as it removed his clan protection. The Quran references this: 'Indeed, you do not guide whom you like, but Allah guides whom He wills' (28:56), revealed regarding Abu Talib's refusal to accept Islam despite the Prophet's earnest appeals.",
            reference: "Quran 28:56; Sahih al-Bukhari 1360"
        }
    ],

    "7-27": [
        {
            name: "Al-Isra wal-Mi'raj - The Night Journey and Ascension",
            nameAr: "الإسراء والمعراج",
            year: "11 BH or 1 BH (621 CE)",
            category: "miracle",
            description: "One of the greatest miracles in Islam. Prophet Muhammad (PBUH) was taken by night from Masjid al-Haram in Makkah to Masjid al-Aqsa in Jerusalem (Isra), and then ascended through the seven heavens to the Divine Presence (Mi'raj). During this journey, he met previous Prophets: Adam (AS) in the first heaven, Isa and Yahya (AS) in the second, Yusuf (AS) in the third, Idris (AS) in the fourth, Harun (AS) in the fifth, Musa (AS) in the sixth, and Ibrahim (AS) in the seventh. The five daily prayers (Salah) were prescribed during this journey — initially fifty, reduced to five through Prophet Musa's advice. He was also shown Paradise and Hellfire.",
            reference: "Quran 17:1; Sahih al-Bukhari 3887; Sahih Muslim 162"
        },
        {
            name: "The Five Daily Prayers Prescribed",
            nameAr: "فرض الصلوات الخمس",
            year: "11 BH or 1 BH (621 CE)",
            category: "revelation",
            description: "During the Mi'raj (Heavenly Ascension), Allah prescribed fifty daily prayers for the Muslim Ummah. As the Prophet (PBUH) descended, Prophet Musa (AS) advised him to go back and ask for a reduction, saying his experience with the Children of Israel showed that fifty would be too burdensome. After multiple reductions, the number was fixed at five, but with the reward of fifty. Allah said: 'My Word does not change. These five prayers will equal fifty in reward.'",
            reference: "Sahih al-Bukhari 349; Sahih Muslim 162"
        }
    ],

    // ═══════════════════════════════════════
    // SHA'BAN (Month 8)
    // ═══════════════════════════════════════

    "8-1": [
        {
            name: "Increased Fasting in Sha'ban",
            nameAr: "الإكثار من الصيام في شعبان",
            year: null,
            category: "fasting",
            description: "Aisha (RA) said: 'I never saw the Messenger of Allah fast more in any month than in Sha'ban. He used to fast all of Sha'ban except a little.' The Prophet (PBUH) explained: 'It is a month in which deeds are raised to the Lord of the Worlds, and I love that my deeds be raised while I am fasting.' Sha'ban serves as preparation for the blessed month of Ramadan.",
            reference: "Sahih al-Bukhari 1969; An-Nasa'i 2357"
        }
    ],

    "8-3": [
        {
            name: "Birth of Husayn ibn Ali (RA)",
            nameAr: "مولد الحسين بن علي رضي الله عنه",
            year: "4 AH (626 CE)",
            category: "birth",
            description: "Husayn ibn Ali (RA), the second grandson of Prophet Muhammad (PBUH), was born in Madinah. The Prophet (PBUH) performed the Adhan in his ear, named him, and performed the Aqiqah. He said about Hasan and Husayn: 'These two sons of mine are the chiefs of the youth of Paradise.' Husayn (RA) would later make the ultimate sacrifice at Karbala in 61 AH, standing against injustice and tyranny, becoming a symbol of courage for all Muslims.",
            reference: "Sunan at-Tirmidhi 3775; Sahih al-Bukhari 3753"
        }
    ],

    "8-14": [
        {
            name: "Qiblah Changed to Ka'bah - Most Accepted View",
            nameAr: "تحويل القبلة",
            year: "2 AH (624 CE)",
            category: "revelation",
            description: "The most widely accepted opinion places the change of Qiblah from Jerusalem to the Ka'bah in Makkah in mid-Sha'ban 2 AH, approximately 16 months after the Hijrah. While the Prophet (PBUH) was leading Dhuhr prayer, revelation came commanding the change. The Sahaba who were praying turned mid-prayer from facing Jerusalem to facing Makkah. The mosque where this occurred is known as Masjid al-Qiblatayn (Mosque of Two Qiblahs) in Madinah.",
            reference: "Quran 2:144; Sahih al-Bukhari 4486"
        }
    ],

    "8-15": [
        {
            name: "Laylat al-Bara'ah - Night of Forgiveness",
            nameAr: "ليلة البراءة (ليلة النصف من شعبان)",
            year: null,
            category: "worship",
            description: "The 15th night of Sha'ban is known as Laylat al-Bara'ah (Night of Forgiveness/Salvation). The Prophet (PBUH) said: 'Allah looks at His creation on the night of the middle of Sha'ban and forgives all of His creation except a mushrik (polytheist) or one who harbors hatred in his heart.' While scholars differ on the strength of narrations about this night, many recommend spending it in worship, prayer, and seeking forgiveness.",
            reference: "Ibn Majah 1390; Narrated by Abu Musa al-Ash'ari"
        }
    ],

    // ═══════════════════════════════════════
    // RAMADAN (Month 9) - Month of Fasting
    // ═══════════════════════════════════════

    "9-1": [
        {
            name: "Beginning of Ramadan - Obligatory Fasting",
            nameAr: "بداية شهر رمضان المبارك",
            year: "2 AH (624 CE)",
            category: "fasting",
            description: "Ramadan is the holiest month in Islam. Fasting during Ramadan was made obligatory in 2 AH. Allah says: 'O you who believe, fasting is prescribed for you as it was prescribed for those before you, that you may attain Taqwa (God-consciousness)' (Quran 2:183). The Prophet (PBUH) said: 'When Ramadan begins, the gates of Paradise are opened, the gates of Hellfire are closed, and the devils are chained.' It is a month of fasting, prayer, Quran recitation, charity, and spiritual renewal.",
            reference: "Quran 2:183-185; Sahih al-Bukhari 1899"
        },
        {
            name: "Scriptures of Ibrahim (AS) Revealed",
            nameAr: "نزول صحف إبراهيم",
            year: null,
            category: "revelation",
            description: "According to a hadith narrated by Wathilah ibn al-Asqa', the Scriptures (Suhuf) of Prophet Ibrahim (Abraham, AS) were revealed on the first night of Ramadan. These scriptures contained guidance, wisdom, and divine commandments for Ibrahim (AS) and his followers. They are mentioned in the Quran: 'Indeed, this is in the former scriptures, the scriptures of Ibrahim and Musa' (Quran 87:18-19).",
            reference: "Musnad Ahmad; Quran 87:18-19"
        }
    ],

    "9-2": [
        {
            name: "Torah Revealed to Prophet Musa (AS)",
            nameAr: "نزول التوراة",
            year: null,
            category: "revelation",
            description: "According to hadith, the Torah (Tawrat) was revealed to Prophet Musa (Moses, AS) on the 6th of Ramadan (some narrations say 2nd). The Torah was the divine scripture given to guide the Children of Israel. It contained laws, commandments, and guidance. The Quran affirms: 'Indeed, We sent down the Torah, in which was guidance and light' (Quran 5:44).",
            reference: "Musnad Ahmad; Quran 5:44"
        }
    ],

    "9-6": [
        {
            name: "Torah Revealed - Alternate Narration",
            nameAr: "نزول التوراة",
            year: null,
            category: "revelation",
            description: "In another narration from the hadith of Wathilah ibn al-Asqa', the Torah was revealed to Prophet Musa (AS) on the 6th of Ramadan. This hadith mentions that each major scripture was revealed in Ramadan: the Torah on the 6th, the Gospel on the 13th, the Psalms on the 18th, and the Quran on the 24th (or during Laylat al-Qadr).",
            reference: "Musnad Ahmad; Hadith of Wathilah"
        }
    ],

    "9-10": [
        {
            name: "Death of Khadijah (RA) - Alternate Date",
            nameAr: "وفاة خديجة رضي الله عنها",
            year: "10 BH (619 CE)",
            category: "death",
            description: "Some historians place the death of Khadijah bint Khuwaylid (RA), the beloved first wife of the Prophet (PBUH), on 10 Ramadan. Whether in Ramadan or Jumada al-Ula, her passing marked the beginning of the 'Year of Sorrow.' She was the first to believe in the Prophet's message, the first Muslim, and his unwavering support for 25 years of marriage.",
            reference: "Various Sirah sources"
        }
    ],

    "9-13": [
        {
            name: "Gospel (Injil) Revealed to Prophet Isa (AS)",
            nameAr: "نزول الإنجيل",
            year: null,
            category: "revelation",
            description: "According to the hadith of Wathilah, the Gospel (Injil) was revealed to Prophet Isa (Jesus, AS) on the 13th of Ramadan. The Quran says: 'And We sent, following in their footsteps, Isa, the son of Maryam, confirming that which came before him in the Torah; and We gave him the Gospel, in which was guidance and light' (Quran 5:46).",
            reference: "Musnad Ahmad; Quran 5:46"
        }
    ],

    "9-15": [
        {
            name: "Birth of Hasan ibn Ali (RA)",
            nameAr: "مولد الحسن بن علي",
            year: "3 AH (625 CE)",
            category: "birth",
            description: "Hasan ibn Ali (RA), the first grandson of Prophet Muhammad (PBUH), was born. He was the son of Ali (RA) and Fatimah (RA). The Prophet (PBUH) performed the Adhan in his ear, named him, and performed the Aqiqah. He said: 'Hasan and Husayn are the chiefs of the youth of Paradise.' Hasan (RA) later became known for his generosity, forbearance, and his historic act of reconciliation.",
            reference: "Sunan at-Tirmidhi 3768; Sahih al-Bukhari 2704"
        }
    ],

    "9-17": [
        {
            name: "First Revelation of the Quran",
            nameAr: "نزول الوحي الأول",
            year: "13 BH (610 CE)",
            category: "revelation",
            description: "Angel Jibreel (AS) appeared to Prophet Muhammad (PBUH) in the Cave of Hira on Mount Nur near Makkah and revealed the first five verses of Surah al-Alaq: 'Iqra bismi Rabbika alladhi khalaq' (Read! In the name of your Lord who created). The Prophet was 40 years old. This moment began the 23-year period of Quranic revelation and the prophethood of Muhammad (PBUH). He returned home trembling, and Khadijah (RA) comforted him, saying: 'By Allah, Allah will never disgrace you.'",
            reference: "Quran 96:1-5; Sahih al-Bukhari 3"
        },
        {
            name: "Battle of Badr - The Decisive Victory",
            nameAr: "غزوة بدر الكبرى",
            year: "2 AH (624 CE)",
            category: "battle",
            description: "The most significant battle in Islamic history. 313 Muslims faced approximately 1,000 well-equipped Quraysh warriors at the wells of Badr. Despite being outnumbered and outarmed, the Muslims achieved a decisive victory with Allah's help. Allah sent angels to fight alongside the believers. Key Quraysh leaders including Abu Jahl, Umayyah ibn Khalaf, and Utbah ibn Rabi'ah were killed. The Quran calls it 'Yawm al-Furqan' (Day of Criterion — the day that distinguished truth from falsehood). 14 Muslims were martyred; 70 Quraysh were killed and 70 captured.",
            reference: "Quran 3:123, 8:5-19, 8:42-44; Sahih al-Bukhari 3953"
        },
        {
            name: "Angels Descend at the Battle of Badr",
            nameAr: "نزول الملائكة في بدر",
            year: "2 AH (624 CE)",
            category: "miracle",
            description: "Allah sent 1,000 (and in some narrations 3,000 to 5,000) angels to fight alongside the Muslims at Badr. 'Remember when you asked help of your Lord, and He answered you: Indeed, I will reinforce you with a thousand from the angels, following one another' (Quran 8:9). Several Sahaba reported seeing the angels. One Sahabi saw a Quraysh warrior's head fly off before any Muslim struck him. The angels were distinguishable by white turbans.",
            reference: "Quran 3:123-126, 8:9-12; Sahih Muslim"
        }
    ],

    "9-18": [
        {
            name: "Psalms (Zabur) Revealed to Prophet Dawud (AS)",
            nameAr: "نزول الزبور",
            year: null,
            category: "revelation",
            description: "According to the hadith of Wathilah, the Psalms (Zabur) were revealed to Prophet Dawud (David, AS) on the 18th of Ramadan. The Quran says: 'And to Dawud We gave the Zabur' (4:163). Dawud (AS) was known for his beautiful voice in reciting the Zabur, so much so that mountains and birds would join him in glorifying Allah.",
            reference: "Musnad Ahmad; Quran 4:163, 34:10"
        }
    ],

    "9-19": [
        {
            name: "Ali ibn Abi Talib (RA) Struck - Begins Last Days",
            nameAr: "ضرب علي بن أبي طالب",
            year: "40 AH (661 CE)",
            category: "historical",
            description: "Ali ibn Abi Talib (RA), the fourth Rightly-Guided Caliph, was struck by the Kharijite assassin Abd al-Rahman ibn Muljam with a poisoned sword while leading the Fajr prayer in the mosque of Kufa. He survived for two days before passing away on 21 Ramadan. Before his death, Ali (RA) instructed his sons to treat his assassin justly and not to kill anyone else in retaliation.",
            reference: "Ibn Sa'd, Kitab at-Tabaqat; Ibn Kathir"
        }
    ],

    "9-20": [
        {
            name: "Conquest of Makkah (Fath Makkah)",
            nameAr: "فتح مكة المكرمة",
            year: "8 AH (630 CE)",
            category: "battle",
            description: "The Prophet (PBUH) entered Makkah with an army of 10,000 Muslims in a virtually bloodless conquest. He entered the city with humility, his head bowed on his camel. He went to the Ka'bah and destroyed 360 idols, reciting: 'Truth has come and falsehood has vanished. Indeed, falsehood is bound to vanish' (Quran 17:81). He then granted general amnesty to the people of Makkah — the very people who had persecuted him for 13 years — saying: 'Go, you are free.' This act of forgiveness is unparalleled in human history.",
            reference: "Sahih al-Bukhari 4287; Quran 17:81; Ibn Hisham"
        }
    ],

    "9-21": [
        {
            name: "Martyrdom of Ali ibn Abi Talib (RA)",
            nameAr: "استشهاد علي بن أبي طالب رضي الله عنه",
            year: "40 AH (661 CE)",
            category: "death",
            description: "Ali ibn Abi Talib (RA) passed away from the wound inflicted by Ibn Muljam two days earlier. He was 63 years old. Ali (RA) was the fourth Rightly-Guided Caliph, known for his knowledge, courage, and justice. The Prophet (PBUH) said: 'You are to me as Harun was to Musa, except that there is no prophet after me.' He was buried in Kufa (modern-day Najaf, Iraq). His caliphate lasted approximately 5 years.",
            reference: "Sahih al-Bukhari 3706; Sahih Muslim 2404"
        }
    ],

    "9-24": [
        {
            name: "Quran Revealed - Laylat al-Qadr",
            nameAr: "نزول القرآن الكريم",
            year: null,
            category: "revelation",
            description: "The Quran was revealed from the Preserved Tablet (Lawh al-Mahfuz) to the lowest heaven (Bayt al-'Izzah) in its entirety on Laylat al-Qadr, and then revealed gradually to Prophet Muhammad (PBUH) over 23 years. 'Indeed, We sent it [the Quran] down during the Night of Decree' (Quran 97:1). Some scholars hold the 24th was the first night of revelation, though the exact date varies.",
            reference: "Quran 97:1-5, 44:3, 2:185"
        }
    ],

    "9-25": [
        {
            name: "Battle of Hunayn Preparations",
            nameAr: "التجهيز لغزوة حنين",
            year: "8 AH (630 CE)",
            category: "historical",
            description: "Shortly after the Conquest of Makkah, the tribes of Hawazin and Thaqif gathered a massive army to fight the Muslims. The Prophet (PBUH) set out with 12,000 warriors — the largest Muslim army yet. Initial overconfidence led to a near-defeat, but the Prophet (PBUH) stood firm, calling out: 'I am the Prophet, no lie! I am the son of Abd al-Muttalib!' The Muslims rallied and won. The Quran references this: 'On the day of Hunayn, when your great number pleased you but it did not avail you at all' (9:25).",
            reference: "Quran 9:25-26; Sahih al-Bukhari 4317"
        }
    ],

    "9-26": [
        {
            name: "Battle of Ain Jalut",
            nameAr: "معركة عين جالوت",
            year: "658 AH (1260 CE)",
            category: "battle",
            description: "The Mamluk army under Sultan Qutuz and his general Baybars defeated the Mongol army at Ain Jalut (Spring of Goliath) in Palestine. This was the first major Mongol defeat in history, halting their seemingly unstoppable westward advance and saving the Muslim world from annihilation. After the Mongols had destroyed Baghdad and killed the Abbasid Caliph just two years earlier, this victory was a turning point that preserved Islamic civilization.",
            reference: "Ibn Kathir, Al-Bidaya wan-Nihaya; Al-Maqrizi"
        }
    ],

    "9-27": [
        {
            name: "Laylat al-Qadr - The Night of Decree (Most Likely)",
            nameAr: "ليلة القدر",
            year: null,
            category: "worship",
            description: "Laylat al-Qadr is the greatest night of the year, better than a thousand months (83+ years) of worship. The Quran was first revealed on this night. Angels and the Spirit (Jibreel) descend with every decree. The Prophet (PBUH) said: 'Search for Laylat al-Qadr in the odd nights of the last ten days of Ramadan.' The 27th is the most commonly observed, though it could be any odd night (21st, 23rd, 25th, 27th, or 29th). 'The Night of Decree is better than a thousand months. The angels and the Spirit descend therein by permission of their Lord for every matter. Peace it is until the emergence of dawn.'",
            reference: "Quran 97:1-5; Sahih al-Bukhari 2017; Sahih Muslim 1165"
        }
    ],

    // ═══════════════════════════════════════
    // SHAWWAL (Month 10)
    // ═══════════════════════════════════════

    "10-1": [
        {
            name: "Marriage of Aisha (RA) to Prophet Muhammad (PBUH)",
            nameAr: "زواج عائشة من النبي ﷺ",
            year: "1 AH (623 CE)",
            category: "historical",
            description: "The marriage of Aisha bint Abu Bakr (RA) to the Prophet Muhammad (PBUH) was consummated in Shawwal 1 AH in Madinah, after the Hijrah. The nikah (marriage contract) had been performed earlier in Makkah. Aisha (RA) became one of the most learned scholars of Islam, narrating over 2,200 hadiths. She said: 'I was married in Shawwal and consummated in Shawwal, so which of the wives of the Prophet was more fortunate than me?' — dispelling the pre-Islamic superstition against marrying in Shawwal.",
            reference: "Sahih Muslim 1423; Sahih al-Bukhari"
        },
        {
            name: "Eid al-Fitr",
            nameAr: "عيد الفطر المبارك",
            year: null,
            category: "celebration",
            description: "Eid al-Fitr marks the end of Ramadan and is one of the two major Islamic celebrations. The Prophet (PBUH) said: 'For every people there is a celebration and this is our celebration.' It begins with a special congregational prayer (Salat al-Eid), giving Zakat al-Fitr (charity) before the prayer, wearing best clothes, taking different routes to and from prayer, and celebrating with family and community. Fasting on this day is prohibited. It is a day of gratitude to Allah for the strength to complete Ramadan.",
            reference: "Sahih al-Bukhari 952; Sahih Muslim 892"
        },
        {
            name: "Six Days of Shawwal Fasting Begins",
            nameAr: "بداية صيام ستة من شوال",
            year: null,
            category: "fasting",
            description: "The Prophet (PBUH) said: 'Whoever fasts Ramadan and follows it with six days of Shawwal, it is as if he fasted the entire year.' The calculation: Ramadan (30 days x 10 = 300 rewards) + 6 Shawwal days (6 x 10 = 60 rewards) = 360 rewards, equivalent to a full year. These six days can be fasted consecutively or spread throughout Shawwal, but fasting on Eid day itself is prohibited.",
            reference: "Sahih Muslim 1164"
        }
    ],

    "10-2": [
        {
            name: "Battle of Uhud - Alternate Date",
            nameAr: "غزوة أحد",
            year: "3 AH (625 CE)",
            category: "battle",
            description: "Some sources date the Battle of Uhud to early Shawwal. The Quraysh, seeking revenge for Badr, attacked Madinah with 3,000 warriors. The Prophet (PBUH) positioned archers on Mount Uhud, but when they abandoned their posts to collect war spoils, Khalid ibn al-Walid (then on the Quraysh side) attacked from behind. 70 Muslims were martyred including Hamza ibn Abd al-Muttalib (RA), the Prophet's uncle. The Prophet himself was wounded. The battle taught the importance of obedience to the Prophet's commands.",
            reference: "Quran 3:121-175; Sahih al-Bukhari"
        }
    ],

    "10-5": [
        {
            name: "Battle of the Trench (Khandaq/Ahzab)",
            nameAr: "غزوة الخندق (الأحزاب)",
            year: "5 AH (627 CE)",
            category: "battle",
            description: "A coalition of 10,000 fighters from Quraysh, Ghatafan, and other tribes besieged Madinah. Salman al-Farisi (RA) suggested digging a trench (khandaq) — a tactic unknown to the Arabs. The siege lasted about a month. Despite the betrayal of Banu Qurayza during the siege, Allah sent fierce winds and unseen forces that demoralized the enemy. 'O you who believe, remember the favor of Allah upon you when armies came to you and We sent against them a wind and armies you did not see' (Quran 33:9). The Prophet (PBUH) declared: 'Now we will go to them, and they will not come to us.'",
            reference: "Quran 33:9-27; Sahih al-Bukhari 4106"
        }
    ],

    "10-6": [
        {
            name: "Battle of Hunayn",
            nameAr: "غزوة حنين",
            year: "8 AH (630 CE)",
            category: "battle",
            description: "Shortly after the Conquest of Makkah, the Muslim army of 12,000 fought the combined forces of Hawazin and Thaqif in the valley of Hunayn. The Muslims were initially ambushed and scattered, but the Prophet (PBUH) held firm and called his companions. The Quran records: 'Allah has already given you victory in many regions and on the day of Hunayn, when your great number pleased you, but it did not avail you at all' (9:25). The Muslims ultimately prevailed, gaining abundant war spoils.",
            reference: "Quran 9:25-26; Sahih al-Bukhari 4317"
        }
    ],

    "10-7": [
        {
            name: "Battle of Uhud",
            nameAr: "غزوة أحد",
            year: "3 AH (625 CE)",
            category: "battle",
            description: "The Battle of Uhud took place near Mount Uhud, outside Madinah. 700 Muslims faced 3,000 Quraysh warriors. The Prophet (PBUH) placed 50 archers on the hill with strict orders not to move. The Muslims were winning, but most archers left their posts. Khalid ibn al-Walid (who had not yet accepted Islam) led a devastating flanking attack. Hamza (RA) was martyred, and the Prophet (PBUH) was injured — his helmet was smashed, his tooth was broken, and his face was bloodied. Despite the setback, Uhud taught invaluable lessons about discipline and obedience.",
            reference: "Quran 3:121-175; Sahih al-Bukhari 4043-4068"
        },
        {
            name: "Martyrdom of Hamza ibn Abd al-Muttalib (RA)",
            nameAr: "استشهاد حمزة بن عبد المطلب",
            year: "3 AH (625 CE)",
            category: "death",
            description: "Hamza (RA), the uncle of the Prophet (PBUH) and the 'Lion of Allah and His Messenger' (Asadullah wa Asad Rasulihi), was martyred at the Battle of Uhud. He was killed by Wahshi ibn Harb with a javelin. Hind bint Utbah mutilated his body in revenge for her father's death at Badr. The Prophet (PBUH) wept bitterly upon seeing his uncle's mutilated body. He called Hamza 'the chief of martyrs' (Sayyid al-Shuhada).",
            reference: "Sahih al-Bukhari; Ibn Hisham"
        }
    ],

    // ═══════════════════════════════════════
    // DHUL QI'DAH (Month 11) - Sacred Month
    // ═══════════════════════════════════════

    "11-1": [
        {
            name: "Sacred Month of Dhul Qi'dah Begins",
            nameAr: "بداية شهر ذي القعدة",
            year: null,
            category: "worship",
            description: "Dhul Qi'dah is the third of the four sacred months in Islam (along with Muharram, Rajab, and Dhul Hijjah). Its name means 'the month of sitting/resting,' as the Arabs would cease fighting and sit in their homes during this sacred month. Allah says: 'Indeed, the number of months with Allah is twelve months in the register of Allah from the day He created the heavens and the earth; of these, four are sacred' (Quran 9:36).",
            reference: "Quran 9:36"
        }
    ],

    "11-4": [
        {
            name: "Umrah al-Qada (The Make-Up Umrah)",
            nameAr: "عمرة القضاء",
            year: "7 AH (629 CE)",
            category: "worship",
            description: "The Prophet (PBUH) and 2,000 Muslims performed the Umrah they had been prevented from completing the previous year at Hudaybiyyah. This was the first time Muslims entered Makkah peacefully since the Hijrah. As per the treaty, the Quraysh evacuated Makkah for three days while the Muslims performed Umrah. The sight of Muslims performing Tawaf and worship at the Ka'bah deeply moved many Quraysh, and several prominent figures like Khalid ibn al-Walid and Amr ibn al-As accepted Islam shortly after.",
            reference: "Ibn Hisham; Sahih al-Bukhari"
        }
    ],

    "11-5": [
        {
            name: "Second Pledge of Aqabah",
            nameAr: "بيعة العقبة الثانية",
            year: "13 BH (622 CE)",
            category: "treaty",
            description: "73 men and 2 women from Madinah met the Prophet (PBUH) at Aqabah during the Hajj season and pledged to protect him as they would protect their own families. This 'Pledge of War' (Bay'at al-Harb) was much stronger than the first. They pledged: 'We pledge allegiance to you on the condition that we will protect you as we protect our women and children.' The Prophet (PBUH) appointed 12 leaders (Nuqaba) from among them. This pledge directly led to the Hijrah to Madinah.",
            reference: "Ibn Hisham; Musnad Ahmad"
        }
    ],

    "11-6": [
        {
            name: "Treaty of Hudaybiyyah",
            nameAr: "صلح الحديبية",
            year: "6 AH (628 CE)",
            category: "treaty",
            description: "The Prophet (PBUH) set out with about 1,400 Muslims to perform Umrah but was stopped by the Quraysh at Hudaybiyyah, near Makkah. After negotiations, a 10-year peace treaty was signed with seemingly unfavorable terms for the Muslims. Umar (RA) initially protested, but the Quran declared it a 'clear victory' (Fath Mubin): 'Indeed, We have given you a clear victory' (48:1). The treaty allowed peaceful propagation of Islam, leading to a dramatic increase in conversions. Within two years, Islam spread across the Arabian Peninsula.",
            reference: "Quran 48:1-29; Sahih al-Bukhari 2731-2732"
        },
        {
            name: "Pledge of Ridwan (Bay'at ar-Ridwan)",
            nameAr: "بيعة الرضوان",
            year: "6 AH (628 CE)",
            category: "treaty",
            description: "At Hudaybiyyah, when a false rumor spread that Uthman ibn Affan (RA) — sent as envoy to the Quraysh — had been killed, the Prophet (PBUH) took a pledge from the Sahaba under an acacia tree that they would fight to the death if necessary. About 1,400 Sahaba pledged. Allah expressed His pleasure with them: 'Certainly Allah was pleased with the believers when they pledged allegiance to you under the tree' (Quran 48:18). This is called Bay'at ar-Ridwan (Pledge of Divine Pleasure).",
            reference: "Quran 48:18; Sahih al-Bukhari 4169"
        }
    ],

    "11-25": [
        {
            name: "Prophet Ibrahim (AS) Laid the Foundations of the Ka'bah",
            nameAr: "بناء الكعبة المشرفة",
            year: null,
            category: "historical",
            description: "According to some scholars, Prophet Ibrahim (AS) and his son Isma'il (AS) raised the foundations of the Ka'bah in Dhul Qi'dah. 'And when Ibrahim was raising the foundations of the House and Isma'il, [saying], Our Lord, accept [this] from us. Indeed, You are the Hearing, the Knowing' (Quran 2:127). The Ka'bah is the first house of worship established for mankind. The Black Stone (Hajar al-Aswad) was placed by Ibrahim (AS) as a marker for the beginning of Tawaf.",
            reference: "Quran 2:127, 3:96-97"
        }
    ],

    // ═══════════════════════════════════════
    // DHUL HIJJAH (Month 12) - Month of Hajj
    // ═══════════════════════════════════════

    "12-1": [
        {
            name: "First 10 Days of Dhul Hijjah - Best Days of the Year",
            nameAr: "أفضل أيام الدنيا",
            year: null,
            category: "worship",
            description: "The Prophet (PBUH) said: 'There are no days in which righteous deeds are more beloved to Allah than these ten days.' They asked: 'Not even jihad in the cause of Allah?' He said: 'Not even jihad in the cause of Allah, except a man who goes out with his life and wealth and returns with nothing.' Allah swears by these days in the Quran: 'By the dawn, and by the ten nights' (89:1-2). It is highly recommended to increase in worship, dhikr, fasting, and good deeds during this period.",
            reference: "Sahih al-Bukhari 969; Quran 89:1-2"
        },
        {
            name: "Hajj Season Begins",
            nameAr: "بداية موسم الحج",
            year: null,
            category: "worship",
            description: "The annual pilgrimage to Makkah, one of the five pillars of Islam, takes place in the first two weeks of Dhul Hijjah. 'And proclaim to the people the Hajj; they will come to you on foot and on every lean camel; they will come from every distant pass' (Quran 22:27). Hajj is obligatory once in a lifetime for every Muslim who is physically and financially able. It commemorates the actions of Prophet Ibrahim (AS) and his family.",
            reference: "Quran 22:27; Sahih al-Bukhari"
        }
    ],

    "12-6": [
        {
            name: "Marriage of Fatimah (RA) and Ali (RA)",
            nameAr: "زواج فاطمة وعلي رضي الله عنهما",
            year: "2 AH (624 CE)",
            category: "historical",
            description: "The marriage of Fatimah (RA), daughter of the Prophet (PBUH), and Ali ibn Abi Talib (RA) was consummated in the early period after Hijrah. This was a simple and blessed marriage — the mahr (dowry) was Ali's shield, and the wedding feast was modest. The Prophet (PBUH) prayed for them: 'O Allah, bless them and bless their offspring.' From this union came Hasan, Husayn, Zaynab, and Umm Kulthum — the blessed lineage of the Prophet (PBUH).",
            reference: "Ibn Sa'd; Musnad Ahmad; Al-Hakim"
        }
    ],

    "12-8": [
        {
            name: "Day of Tarwiyah",
            nameAr: "يوم التروية",
            year: null,
            category: "worship",
            description: "The 8th of Dhul Hijjah is called Yawm at-Tarwiyah (Day of Quenching). On this day, pilgrims enter the state of Ihram (if not already in it) and proceed to Mina, where they spend the night in prayer and supplication. The name comes from the historical practice of pilgrims filling their water containers (tarwiyah = quenching thirst) before heading to Arafat. It marks the formal beginning of the Hajj rituals.",
            reference: "Fiqh al-Hajj sources; Various hadith"
        }
    ],

    "12-9": [
        {
            name: "Day of Arafah - Greatest Day of the Year",
            nameAr: "يوم عرفة",
            year: null,
            category: "worship",
            description: "The Prophet (PBUH) said: 'Hajj is Arafah.' This is the day pilgrims stand on the plain of Arafat in supplication — the most important ritual of Hajj. The Prophet (PBUH) said: 'There is no day on which Allah frees more people from the Fire than the Day of Arafah. He draws near, then boasts about them to the angels, saying: What do these people want?' It is also the day when the verse of the completion of the religion was revealed.",
            reference: "Sahih Muslim 1348; An-Nasa'i"
        },
        {
            name: "Fasting on the Day of Arafah (for non-pilgrims)",
            nameAr: "صيام يوم عرفة",
            year: null,
            category: "fasting",
            description: "The Prophet (PBUH) said: 'Fasting on the Day of Arafah, I hope from Allah that it will expiate the sins of the year before it and the year after it.' This fasting is specifically for those who are NOT performing Hajj. Pilgrims should not fast on this day so they have strength for their worship at Arafat. This is the single most rewarding optional fast of the year.",
            reference: "Sahih Muslim 1162"
        },
        {
            name: "Completion of the Religion of Islam",
            nameAr: "إكمال الدين",
            year: "10 AH (632 CE)",
            category: "revelation",
            description: "On the Day of Arafah during the Farewell Pilgrimage, the verse was revealed: 'This day I have perfected your religion for you, completed My favor upon you, and have chosen for you Islam as your religion' (Quran 5:3). When a Jewish man told Umar (RA) that if this verse had been revealed to them, they would have taken it as a day of celebration, Umar replied: 'I know the day and the place where it was revealed — it was revealed on a Friday, the Day of Arafah, and both of these are celebrations for us.'",
            reference: "Quran 5:3; Sahih al-Bukhari 45"
        },
        {
            name: "Farewell Sermon (Khutbat al-Wada')",
            nameAr: "خطبة الوداع",
            year: "10 AH (632 CE)",
            category: "historical",
            description: "On the Day of Arafah during his only Hajj, the Prophet (PBUH) delivered his Farewell Sermon to over 100,000 Muslims. Key points included: 'All mankind is from Adam and Eve. An Arab has no superiority over a non-Arab; a white has no superiority over a black — except by piety and good action.' He also emphasized the sanctity of life, property, and honor; the rights of women; the prohibition of interest (riba); and returning trusts. He concluded: 'I have left among you that which, if you hold to it, you will never go astray: the Book of Allah.' He asked: 'Have I delivered the message?' They responded: 'Yes!' He said: 'O Allah, bear witness.'",
            reference: "Sahih Muslim; Musnad Ahmad; Sunan Abu Dawud"
        }
    ],

    "12-10": [
        {
            name: "Eid al-Adha - Festival of Sacrifice",
            nameAr: "عيد الأضحى المبارك",
            year: null,
            category: "celebration",
            description: "The greatest day in the Islamic calendar. Eid al-Adha commemorates Prophet Ibrahim's (AS) willingness to sacrifice his son Isma'il (AS) in obedience to Allah's command. When Ibrahim (AS) passed this ultimate test, Allah ransomed Isma'il with a ram from Paradise. Muslims worldwide perform Qurbani (animal sacrifice), pray the Eid prayer, and celebrate. The Prophet (PBUH) said: 'The greatest day in the sight of Allah is the Day of Sacrifice (Yawm an-Nahr).'",
            reference: "Quran 37:102-107; Sunan Abu Dawud 1765"
        },
        {
            name: "Prophet Ibrahim's (AS) Sacrifice and Divine Test",
            nameAr: "ذبح إبراهيم عليه السلام",
            year: null,
            category: "miracle",
            description: "Prophet Ibrahim (AS) saw in a dream that he was sacrificing his son Isma'il (AS). In Islam, the dreams of Prophets are a form of divine revelation. Both father and son submitted to Allah's will. When Ibrahim (AS) laid his son down and was about to sacrifice him, Allah called out: 'O Ibrahim, you have fulfilled the vision. Indeed, We thus reward the doers of good. Indeed, this was the clear trial. And We ransomed him with a great sacrifice' (Quran 37:104-107). A ram from Paradise replaced Isma'il (AS), and this act of submission became the basis of the annual Qurbani.",
            reference: "Quran 37:99-111"
        },
        {
            name: "Stoning of Jamarat al-Aqabah",
            nameAr: "رمي جمرة العقبة",
            year: null,
            category: "worship",
            description: "On the 10th of Dhul Hijjah, pilgrims throw seven pebbles at Jamarat al-Aqabah (the largest pillar), commemorating Prophet Ibrahim's (AS) rejection of Shaytan. When Ibrahim (AS) was on his way to sacrifice Isma'il (AS), Shaytan appeared three times to dissuade him. Ibrahim (AS) threw stones at him each time to drive him away. This ritual symbolizes the Muslim's commitment to rejecting evil temptation.",
            reference: "Sahih al-Bukhari; Musnad Ahmad"
        }
    ],

    "12-11": [
        {
            name: "Days of Tashreeq Begin",
            nameAr: "أيام التشريق",
            year: null,
            category: "celebration",
            description: "The 11th, 12th, and 13th of Dhul Hijjah are the Days of Tashreeq. The Prophet (PBUH) said: 'The Days of Tashreeq are days of eating, drinking, and remembering Allah.' Fasting is prohibited on these days. Pilgrims continue the stoning of the three Jamarat and stay in Mina. Takbirat at-Tashreeq (saying 'Allahu Akbar, Allahu Akbar, La ilaha illallah...' after each prayer) continues from the Fajr of the 9th to the Asr of the 13th of Dhul Hijjah.",
            reference: "Sahih Muslim 1141; Sahih al-Bukhari"
        }
    ],

    "12-12": [
        {
            name: "Second Day of Tashreeq",
            nameAr: "ثاني أيام التشريق",
            year: null,
            category: "celebration",
            description: "The second Day of Tashreeq. Pilgrims stone all three Jamarat (small, medium, and large) with 7 pebbles each, totaling 21 pebbles. Pilgrims who wish to leave Mina early may do so after stoning on this day, before sunset. 'And remember Allah during [specific] numbered days. Then whoever hastens in two days — there is no sin upon him' (Quran 2:203).",
            reference: "Quran 2:203"
        }
    ],

    "12-13": [
        {
            name: "Third Day of Tashreeq - Last Day of Hajj",
            nameAr: "ثالث أيام التشريق",
            year: null,
            category: "celebration",
            description: "The final Day of Tashreeq and the last day of the Hajj rituals for those who stayed in Mina for all three days. Pilgrims perform the final stoning of the Jamarat and prepare for the farewell Tawaf (Tawaf al-Wada'). This concludes the Hajj pilgrimage. The Quran says: '...and whoever delays [until the third] — there is no sin upon him — for him who fears Allah' (2:203).",
            reference: "Quran 2:203; Fiqh al-Hajj sources"
        }
    ],

    "12-24": [
        {
            name: "Mubahala - The Mutual Imprecation",
            nameAr: "يوم المباهلة",
            year: "10 AH (631 CE)",
            category: "historical",
            description: "A delegation of Christians from Najran came to Madinah to discuss religion with the Prophet (PBUH). When they refused to accept Islam, the verse of Mubahala was revealed: 'Then say, Come, let us call our sons and your sons, our women and your women, ourselves and yourselves, then let us earnestly pray and invoke the curse of Allah upon the liars' (Quran 3:61). The Prophet (PBUH) came with Ali, Fatimah, Hasan, and Husayn (RA). The Christians, seeing his confidence, chose not to proceed with the mutual imprecation and instead agreed to a peace treaty.",
            reference: "Quran 3:61; Sahih Muslim"
        }
    ],

    "12-18": [
        {
            name: "Event of Ghadir Khumm",
            nameAr: "حادثة غدير خم",
            year: "10 AH (632 CE)",
            category: "historical",
            description: "On the return journey from the Farewell Pilgrimage, the Prophet (PBUH) stopped at Ghadir Khumm and addressed the Muslims. He held Ali ibn Abi Talib's hand and said: 'Whoever I am his mawla (master/friend), Ali is his mawla. O Allah, befriend whoever befriends him and be hostile to whoever is hostile to him.' This event is interpreted differently by various Islamic traditions regarding its implications for leadership succession.",
            reference: "Sunan at-Tirmidhi 3713; Musnad Ahmad"
        },
        {
            name: "Assassination of Uthman ibn Affan (RA)",
            nameAr: "استشهاد عثمان بن عفان رضي الله عنه",
            year: "35 AH (656 CE)",
            category: "death",
            description: "Uthman ibn Affan (RA), the third Rightly-Guided Caliph, was assassinated by rebels in his own home in Madinah while reading the Quran. Known as 'Dhun-Nurayn' (Possessor of Two Lights) because he married two daughters of the Prophet (PBUH) — Ruqayyah and Umm Kulthum. His greatest achievement was the standardization and compilation of the Quran into a single definitive text. His blood fell on the mushaf (Quran copy), and his death at age 82 triggered a period of civil strife (fitnah) in the Muslim community.",
            reference: "Sahih al-Bukhari; At-Tabari"
        }
    ],

    "12-23": [
        {
            name: "Assassination of Umar ibn al-Khattab (RA)",
            nameAr: "اغتيال عمر بن الخطاب رضي الله عنه",
            year: "23 AH (644 CE)",
            category: "death",
            description: "Umar ibn al-Khattab (RA), the second Rightly-Guided Caliph, was stabbed by Abu Lu'lu'ah al-Majusi (a Persian slave) while leading the Fajr prayer. He was struck six times with a poisoned dagger. Umar (RA) survived for three days and appointed a council of six Sahaba (Uthman, Ali, Talha, Zubayr, Sa'd, and Abd al-Rahman ibn Awf) to choose his successor. Before dying, he asked his son Abdullah to seek Aisha's permission to be buried next to the Prophet (PBUH) and Abu Bakr (RA), which was granted. He was 63 years old.",
            reference: "Sahih al-Bukhari 3700; Ibn Sa'd"
        }
    ],

    "12-25": [
        {
            name: "Umar ibn al-Khattab (RA) Becomes Caliph",
            nameAr: "خلافة عمر بن الخطاب",
            year: "13 AH (634 CE)",
            category: "historical",
            description: "Umar ibn al-Khattab (RA) assumed the caliphate after Abu Bakr (RA) nominated him before his death. He was the first to be called 'Amir al-Mu'minin' (Commander of the Faithful). Under his 10-year caliphate, the Islamic state expanded enormously — conquering the Persian Empire entirely, taking Syria, Palestine, Egypt, and parts of North Africa from the Byzantines. He established the Islamic judiciary, the Hijri calendar, the Bayt al-Mal (treasury), and many administrative systems still influential today.",
            reference: "At-Tabari; Ibn Sa'd"
        }
    ]
};

/* ═══════════════════════════════════════
   Additional recurring/period-based events
   added programmatically for Ramadan nights
   ═══════════════════════════════════════ */

// Add Laylat al-Qadr markers for odd nights of last 10 Ramadan
(function() {
    var qdrNights = [21, 23, 25, 27, 29];
    qdrNights.forEach(function(day) {
        var key = "9-" + day;
        if (!HIJRI_EVENTS[key]) HIJRI_EVENTS[key] = [];
        // Only add if not already present (27 already has it)
        var hasQdr = HIJRI_EVENTS[key].some(function(e) { return e.name.indexOf('Laylat al-Qadr') !== -1; });
        if (!hasQdr) {
            HIJRI_EVENTS[key].push({
                name: "Possible Night of Laylat al-Qadr",
                nameAr: "ليلة القدر المحتملة",
                year: null,
                category: "worship",
                description: "The Prophet (PBUH) said: 'Search for Laylat al-Qadr in the odd nights of the last ten days of Ramadan.' This night is better than a thousand months. It is recommended to spend this night in prayer, Quran recitation, and making du'a. Aisha (RA) asked the Prophet what to say if she found Laylat al-Qadr, and he taught her: 'Allahumma innaka 'afuwwun tuhibbul 'afwa fa'fu 'anni' (O Allah, You are the Pardoner and You love to pardon, so pardon me).",
                reference: "Sahih al-Bukhari 2017; Sunan at-Tirmidhi 3513"
            });
        }
    });

    // Add I'tikaf marker for last 10 of Ramadan
    var key20 = "9-20";
    if (!HIJRI_EVENTS[key20]) HIJRI_EVENTS[key20] = [];
    HIJRI_EVENTS[key20].push({
        name: "Last 10 Nights of Ramadan - I'tikaf Begins",
        nameAr: "بداية الاعتكاف في العشر الأواخر",
        year: null,
        category: "worship",
        description: "The Prophet (PBUH) used to observe I'tikaf (spiritual retreat in the mosque) during the last ten nights of Ramadan. Aisha (RA) said: 'When the last ten days of Ramadan came, the Prophet (PBUH) used to tighten his waist belt (i.e., work hard), stay up all night, and wake his family.' I'tikaf involves dedicating oneself entirely to worship, Quran recitation, and seeking Laylat al-Qadr.",
        reference: "Sahih al-Bukhari 2024; Sahih Muslim 1174"
    });
})();
