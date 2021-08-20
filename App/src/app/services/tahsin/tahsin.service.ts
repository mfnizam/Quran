import { Injectable } from '@angular/core';

export class Tahsin{
	_id: any;
	nama: string;
	keterangan: string;
  comingsoon?: boolean;
  materi?: {
    _id: any,
    nama: string;
    arab?: string;
    keterangan: string;
    link?: string,
    detail?: {
      nama: string,
      sub?: string,
      keterangan?: any;
    }[];
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class TahsinService {

	tahsin: Tahsin[] = [{
		_id: 'mh',
    nama: "Makhorijul Huruf", 
    keterangan: "Tempat keluarnya huruf",
    materi: [{
      _id: 'mh-aj',
      nama: "Al Jauf",
      arab: "(الجوف)",
      keterangan: "Yaitu tempat keluarnya huruf hijaiyah yang terletak pada rongga mulut dan rongga tenggorokan bisa disebut bagian dari mad.",
      detail: [{
        nama: 'Huruf alif ( ا )',
        keterangan: [{
          nama: 'Ketika sebelum hurufnya berharakat fathah (baris atas) maka dibaca panjang 2 harakat. Membuka mulut sesuai dengan makhorijul huruf sebelum alif'
        }]
      }, {
        nama: 'Huruf wauw mati ( وْ )',
        keterangan: [{
          nama: 'Ketika sebelum hurufnya berharakat dommah maka dibaca panjang 2 harakat. Dibuat mencucu seperti penyebutan tanda harakat dommah.'
        }]
      }, {
        nama: 'Huruf ya’ mati ( يْ )',
        keterangan: [{
          nama: 'Ketika sebelum hurufnya berharakat kasrah (baris atas) maka dipanjang panjang 2 harakat. Dibaca cengir atau tersenyum seperti penyebutan kasrah.'
        }]
      }]
    }, {
      _id: 'mh-ah',
      nama: "Al Halq",
      arab: " (الحلق)",
      keterangan: "Yaitu tempat keluar bunyi huruf hijaiyah yang terletak pada kerongkongan / tenggorokan. Dan berdasarkan perbedaan teknis pelafalannya, huruf-huruf halqiyah (huruf-huruf yang keluar dari tenggorokan) dibagi menjadi tiga bagian lagi.",
      detail: [{
        nama: "Aqshal Halqi",
        sub: "(pangkal tenggorokan)",
        keterangan: [{ 
          nama: 'Huruf hamzah ( ء )',
          link: 'https://www.youtube.com/embed/S4BHsds9VkI'
        }, { 
          nama: 'Huruf ha’ besar ( ه )',
          link: 'https://www.youtube.com/embed/z-96z3LDI_k'
        }]
      }, {
        nama: "Wasthul Halqi",
        sub: "(pertengahan tenggorokan)",
        keterangan: [{ 
          nama: 'Huruf ’ain ( ع )',
          link: 'https://www.youtube.com/embed/d9Kjt5o1Nio'
        }, {
          nama: 'Huruf ha kecil ( ح )',
          link: 'https://www.youtube.com/embed/ShQFhJjODhA'
        }]
      }, {
        nama: "Adnal Halqi",
        sub: "(ujung tenggorokan)",
        keterangan: [{ 
          nama: 'Huruf kho’ ( خ )',
          link: 'https://www.youtube.com/embed/Z_8rc7GK9JY'
        }, {
          nama: 'Huruf ghoin ( غ )',
          link: 'https://www.youtube.com/embed/CoDHF3CUwWU'
        }]
      }]
    }, {
      _id: 'mh-al',
      nama: "Al Lisan",
      arab: " (اللسان)",
      keterangan: "Al Lisan artinya lisan dimana bunyi huruf hijaiyah dengan tempat keluarnya dari lidah. Terdapat 18 huruf yang dapat dikelompokkan menjadi 10 makhraj. ",
      detail: [{
        nama: 'Aqshal Lisan Fauqa',
        sub: '(Pangkal Lidah Belakang)',
        keterangan: [{
          nama: 'Huruf Qof (ق)',
          keterangan: 'bunyi huruf qof ini keluar dari pangkal lidah dekat dengan kerongkongan yang dihimpitkan ke langit-langit mulut bagian atas (belakang)',
          link: 'https://www.youtube.com/embed/vmJcx6X2X6Q'
        }]
      }, {
        nama: 'Aqshal Lisan Asfal',
        sub: '(Pangkal Lidah Depan)',
        keterangan: [{
          nama: 'Huruf Kaf (ك)',
          keterangan: 'bunyi huruf kaf ini keluar dari pangkal lidah di depan makhraj huruf qof, yang dihimpitkan ke langit-langit bagian mulut bagian tengah',
          link: 'https://www.youtube.com/embed/4kP87DJCB0A'
        }]
      }, {
        nama: 'Wasthul Lisan',
        sub: '(Tengah Lidah)',
        keterangan: [{
          nama: 'Huruf Jim ( ج )',
          keterangan: 'bunyi huruf jim keluar dari tengah lidah yang dianikkan ke langit-langit bagian atas',
          link: 'https://www.youtube.com/embed/yAtFRHe8Qqo'
        }, {
          nama: 'Huruf Syin ( ش )',
          keterangan: 'bunyi huruf syin keluar ditempat yang sama seperti jim, namun sifat tafasy (angin yang menyebar/berhamburan)',
          link: 'https://www.youtube.com/embed/6oVJIR9cjh8'
        }, {
          nama: 'Huruf Ya’ ( ي )',
          keterangan: 'bunyi ya` berada ditengah lidah namun di naikkan sedikit tanpa menempel denga  langit-langit atas',
          link: 'https://www.youtube.com/embed/AbkGx8h5gg0'
        }]
      }, {
        nama: 'Pangkal Tepi Lidah',
        // sub: '(Pangkal Lidah Depan)',
        keterangan: [{
          nama: 'Huruf Dhod ( ض )',
          keterangan: 'bunyi huruf berada dpinggir lidah dikiri dan kanan (atau dipilih salah satu kiri atau kanan) dimana lidah ditarik dari belakang dalam posisi ditempel ditepi dibawa kedepan seraya diucapkan',
          link: 'https://www.youtube.com/embed/h8PiJFfXiao'
        }]
      }, {
        nama: 'Pinggir Ujung Lidah',
        // sub: '(Pangkal Lidah Depan)',
        keterangan: [{
          nama: 'Huruf Lam (ل)',
          keterangan: 'bunyi huruf lam keluar dari ujung lidah kiri/kanan bertemu dengan langit-langit bagian atas',
          link: 'https://www.youtube.com/embed/-NepKy0JBes'
        }]
      }, {
        nama: 'Ujung Lidah',
        // sub: '(Pangkal Lidah Depan)',
        keterangan: [{
          nama: 'Huruf Nun (ن)',
          keterangan: 'bunyi huruf nun keluar dari ujung lidah ditempelkan ke langit-langit depan bagian atas',
          link: 'https://www.youtube.com/embed/FmPfpRRkKec'
        }]
      }, {
        nama: 'Ujung Lidah Tepat',
        // sub: '(Pangkal Lidah Depan)',
        keterangan: [{
          nama: 'Huruf Ro’ (ر)',
          keterangan: 'bunyi huruf ro` keluar dari ujung lidah  bertemu dengan langit-langit ujung bagian atas',
          link: 'https://www.youtube.com/embed/FhqYf0G8AOI'
        }]
      }, {
        nama: 'Punggung Ujung Lidah',
        // sub: '(Pangkal Lidah Depan)',
        keterangan: [{ 
          nama: "Huruf Tho’ (ط)", 
          keterangan: "bunyi huruf tho' keluar dari punggung ujung lidah bertemu dengan papan gigi seri atas bagian dalam dengan lafal yang tebal (isti'la) membuat lidah tegang.",
          link: 'https://www.youtube.com/embed/q7dSnGUStQ0'
        },
        { 
          nama: "Huruf Dal (د)", 
          keterangan: "bunyi huruf dal keluar dari punggung ujung lidah bertemu dengan papan gigi seri atas bagian dalam dengan lafal yang berbeda dari ta'.",
          link: 'https://www.youtube.com/embed/g2wh9eqUMqA'
        },
        { 
          nama: "Huruf Ta’ (ت)", 
          keterangan: "bunyi huruf ta' keluar dari punggung ujung lidah bertemu dengan papan gigi seri atas bagian dalam.",
          link: 'https://www.youtube.com/embed/4lv0Ff02exM'
        }]
      }, {
        nama: 'Punggung Ujung Lidah Bawah',
        // sub: '(Pangkal Lidah Depan)',
        keterangan: [{ 
          nama: "Huruf Shod (ص)", 
          keterangan: "bunyi huruf shod keluar dari punggung ujung lidah bertemu dengan papan gigi seri bawah bagian dalam dengan lafal yang tebal (isti'la) membuat lidah tegang.",
          link: 'https://www.youtube.com/embed/rKG2ZMJD91U'
        },
        { 
          nama: "Huruf Sin (س)", 
          keterangan: "bunyi huruf sin keluar dari punggung ujung lidah bertemu dengan papan gigi seri bawah bagian dalam, ketiganya memiliki sifat shofir (desis) saat sebelum terucap.",
          link: 'https://www.youtube.com/embed/sJJ_vAox154'
        },
        { 
          nama: "Huruf Za’ (ز)", 
          keterangan: "bunyi huruf za' keluar dari punggung ujung lidah bertemu dengan papan gigi seri bawah bagian dalam dengan lafal yang berbeda dari ta'.",
          link: 'https://www.youtube.com/embed/4_CDsgu2_wA'
        }]
      }, {
        nama: 'Ujung Lidah & Gigi Atas',
        // sub: '(Pangkal Lidah Depan)',
        keterangan: [{ 
          nama: "Huruf Dzho’ (ظ)", 
          keterangan: "bunyi huruf shod keluar keluar dari ujung lidah ditempelkan pada ujung gigi seri atas dengan lafal yang tebal (isti'la) membuat lidah tegang.",
          link: "https://www.youtube.com/embed/aNWE9L-VqSU"
        },
        { 
          nama: "Huruf Dzal (ذ)", 
          keterangan: "bunyi huruf dzal keluar dari ujung lidah ditempelkan pada ujung gigi seri atas.",
          link: "https://www.youtube.com/embed/tcXkG59dxbM"
        },
        { 
          nama: "Huruf Tsa’ (ث)", 
          keterangan: "bunyi huruf tsa' keluar dari ujung lidah ditempelkan pada ujung gigi seri atas.",
          link: "https://www.youtube.com/embed/Q6W7zLuYwyU"
        }]
      }]
    }, {
      _id: 'mh-as',
      nama: "Asy Syafatain",
      arab: " ( الشَّفَتَيْنِ )",
      keterangan: "Asy Syfatain artinya dua bibir dimana tempat keluarnya huruf hijaiyah yang terletak pada kedua bibir.",
      detail: [{
        nama: 'Syafawayiah',
        keterangan: [
        { 
          nama: "Huruf Fa’ (ف)", 
          keterangan: "bunyi huruf fa' keluar dari perut bibir bagian bawah bertemu dengan ujung gigi seri atas.",
          link: 'https://www.youtube.com/embed/RlTSysb1QPE'
        },
        { 
          nama: "Huruf ba’ (ب)", 
          keterangan: "bunyi huruf ba' keluar dari perut bibir bagian atas bertemu dengan perut bibir bagian bawah.",
          link: 'https://www.youtube.com/embed/_Mo7cA0Vf1g'
        },
        { 
          nama: "Huruf mim (م)", 
          keterangan: "bunyi huruf mim keluar dari bibir atas bagian tengan bertemu dengan bibir bawah bagian tengah.",
          link: 'https://www.youtube.com/embed/GujPn2vPKHY'
        },
        { 
          nama: "Huruf wauw (و)", 
          keterangan: "bunyi huruf wauw keluar diantara perut bibir bagian atas dan perut bibir bagian bawah, dimana bibir dimajukan sempurna terlebih dahulu kemudian dibuka selagi menyebut hurufnya.",
          link: 'https://www.youtube.com/embed/W0pHooYfHk8'
        },
        ]
      }]
    }, {
      _id: 'mh-ak',
      nama: "Al Khaisyum",
      arab: " (الخيشوم)",
      keterangan: "Yaitu tempat keluarnya huruf hijaiyah yang terletak pada janur hidung. Dan jika kita menutup hidung ketika membunyikan huruf tersebut, maka tidak dapat terdengar.",
      detail: [{ 
        nama: "Huruf Nun bertasydid (نّ)", 
        keterangan: [{
          nama: "Nun sukun yang dibaca idghom bigunnah, iqlab dan ikhfa’ haqiqi"
        }],
      },
      { 
        nama: "Huruf Mim bertasydid (مّ)", 
        keterangan: [{
          nama: "Mim sukun yang bertemu dengan mim (م) atau ba (ب),"
        }]
      }]
    }]
  }, {
  	_id: 'sf',
    nama: "Sifatul Huruf", 
    keterangan: "Sifat yang melekat pada masing-masing huruf apabila berbaris maupun sukun (mati).",
    comingsoon: true
  }, {
  	_id: 'hb',
    nama: "Hukum Bacaan", 
    keterangan: "Biasanya disebut hukum tajwid",
    comingsoon: true
  }, {
  	_id: 'gh',
    nama: "Gharib", 
    keterangan: "Bacaan asing dalam Al Qur'an.",
    materi: [{
      _id: 'gh-b',
      nama: "Badal",
      keterangan: "Secara bahasa, Badal mempunyai arti merubah. Sedangkah secara istilah, badal adalah mengubah atau mengganti huruf hijaiyah satu dengan huruf hijaiyah yang lain. \n\nContoh bacaan: Dalam Al Qur'an riwayat Hafs 'an 'Ashim yang sering kita baca di Al Qur'an cetakan Indonesia banyak contoh salah satunya dalam Surah Al Ahqaf ayat 4.",
      detail: [{
        nama: 'Hamzah Sukun ( ء , ؤ , ئ ) bertemu dengan Mad',
        sub: 'Bacaan: ائْتُوْنِيْ',
        keterangan: [{
          nama: "Huruf hamzah mati itu diubah dan digantikan dengan Alif ( ا ), Wau ( و ), atau Ya' ( ي ). Panjang bacaan dari Mad Badal yakni 2 harakat atau ketukan. Terdapat dua cara pada surah Al Ahqaf ayat 4, sebagaiamana berikut : Pertama, jika seseorang membaca waqaf (berhenti) pada lafadz (فِى ٱلسَّمَٰوَٰتِ ۖ) maka huruf ta’ mati dan hamzah mati diganti ya’ (فِى ٱلسَّمٰوٰتْ ۖ اِيْتُونِى ). Kedua, jika dibaca washal (lanjut/tidak berhenti) tidak ada perubahan.",
          link: 'https://www.youtube.com/embed/9GOrY1fDT7U'
        }]
      }]
    }, {
      _id: 'gh-i',
      nama: "Imalah",
      keterangan: "Dalam arti bahasa berarti condong atau miring. Sedangkan menurut istilah adalah mencondongkan bacaan harakat fathah pada harakat kasrah sekitar dua pertiganya. \n\nContoh bacaan: Dalam Al Qur'an riwayat Hafs 'an 'Ashim yang sering kita baca di Al Qur'an cetakan Indonesia dalam Surah Hud ayat 41.",
      detail: [{
        nama: "إِمَالَةٌ kecil",
        sub: "مَجْرٰىهَا",
        keterangan: [{
          nama: "Huruf ra dengan tanda baca fathah keatas رٰ yang awalnya dibaca 'a' diganti 'e'. Untuk sifat huruf ra tetap dibaca sebagaimana sifat dan makhorijul hurufnya. ",
          link: "https://www.youtube.com/embed/4T9LkcTxNGU"
        }]
      }]
    }, {
      _id: 'gh-is',
      nama: "Isymam",
      keterangan: "merunut arti secara bahasa, isymam diartikan dengan menggabungkan. Secara istilah, pengertian isymam adalah menggabungkan dua bibir setelah huruf sukun untuk mengisyaratkan dlummah tanpa menimbulkan suara atau napas. \n\nContoh bacaan: Dalam Al Qur'an riwayat Hafs 'an 'Ashim yang sering kita baca di Al Qur'an cetakan Indonesia dalam Surah Yusuf ayat 11.",
      detail: [{
        nama: "إِشْمَامُ kecil",
        sub: "لَا تَأْمَنَّا",
        keterangan: [{
          nama: "Sukun huruf nun. Sehingga bunyinya menjadi man atau مَنْ., Moncongkan bibir, satukan. Cara memoncongkan bibir ini seperti ketika Anda mengucapkan huruf nun berharakat dlummah. Memoncongkan bibir ini sekaligus menjadi isyarat dlummah yang menjadi maksud bacaan isymam. Posisikan mulut seperti sediakala, seperti saat akan mengucapkan nun berharakat fathah. Ucapkan na seperti biasa.",
          link: "https://www.youtube.com/embed/8cdIZ2oElHo"
        }]
      }]
    }, {
      _id: 'gh-mq',
      nama: "Mad & Qashar",
      keterangan: "Mad artinya panjang sesuai dengan sifat dan huruf mad, sedangkan Qashar itu dipendekkan selain dari pada huruf mad. \n\nContoh bacaan: Dalam Al Qur'an riwayat Hafs 'an 'Ashim yang sering kita baca di Al Qur'an cetakan Indonesia ada beberapa bacaan yang tertulis panjang tapi dibaca pendek, begitu juga tertulis pendek tapi dibaca panjang. Dinamakan Shifr Mustadir dan Mustahil akan banyak ditemukan dalam Al Qur'an.",
      link: "https://www.youtube.com/embed/XVD0A4eSh4g",
      detail: [{
        nama: "Shifr Mustadir",
        sub: "Shifr artinya bulat atau bundar, sedangkan mustadir melingkar atau berputar. Dalam pengertian umum biasa dikatakan bulatan sempurna.",
        keterangan: [{
          nama: "Tanda: Lingkaran kecil (o) pada lafal yang diqasharkan.\n\nHuruf: \nBanyak di dalam Al Qur'an biasanya di huruf alif, wauw, dan ya' dengan letaknya ditengah atau akhir kata. \n\nBacaan: \ntertulis لِشَا۫ئٍ , dibaca لِشَئٍ  \n\nCara Baca: \nBacaan dalam al-Qur’an yang bertanda Shafrun Mustadir harus dibaca pendek, baik diwashalkan (terus) maupun diwakafkan (berhenti).",
        }]
      }, {
        nama: "Shifr Mustahil",
        sub: "Shifr artinya bulat atau bundar, sedangkan mustahil berdiri. Dalam pengertian umum biasa dikatakan bulatan lonjong.",
        keterangan: [{
          nama: "Tanda: Lingkaran kecil (0) pada lafal yang diqasharkan.\n\nHuruf: \nAda 6 di dalam Al Qur'an biasanya dihuruf alif dengan letak diakhir kata.\n\nBacaan: \nTertulis اَنَاْ , dibaca lanjut اَنَ, dibaca waqaf اَنَا.\n\nCara Baca: \nTetap dibaca panjang ketika diwakafkan (berhenti), Tetap dibaca pendek ketika di washalkan (terus).",
        }]
      }]
    }, {
      _id: 'gh-n',
      nama: "Naql",
      keterangan: "berasal dari akar kata ( نَقَلَ ) yang artinya memindah. Sedangkan menurut istilah ulama Qurra’ adalah memindahkan harakat huruf yang hidup pada huruf yang mati sesudahnya. \n\nContoh bacaan: Dalam Al Qur'an riwayat Hafs 'an 'Ashim yang sering kita baca di Al Qur'an cetakan Indonesia hanya ada satu pada surah Al Hujurat ayat 11. \n\nTanda: Terdapat 2 hamzah washal, yaitu pada Al Ta'rif  اْلاِ dengan اِسْمُ.\n\nBacaan: tertulis بِئْسَ اْلاِسْمُ  , dibaca بِئْسَ لِسْمُ \n\nCara Baca: Memindahkan harakat alif (kasrah) pada huruf lam yang mati. Disambung menjadi bi'sa lismu.",
      link: "https://www.youtube.com/embed/cqIZ_JHyA_E"
    }, {
      _id: 'gh-s',
      nama: "Saktah",
      keterangan: "Saktah سَكْتَةٌ mempunyai akar kata سَكَتَ yang artinya diam atau berhenti. Sedangkan dalam arti istilah adalah berhenti sejenak tanpa nafas sekitar satu alif lamanya.\n\nContoh bacaan: Dalam Al Qur'an riwayat Hafs 'an 'Ashim yang sering kita baca di Al Qur'an cetakan Indonesia hanya ada 4 bacaan yang boleh digunakan saktah.\n\nTanda: Tanda سَكْتَةٌ kecil. \n\nBacaan: Surah Al Kahfi : 1 ke 2, Surah Yaa Sin ayat 52, Surah Al Qiyamah ayat 27, dan Al Muthaffifin ayat 14.\n\nCara Baca: Membaca dari awal ayat dengan satu tarikan nafas, Berhenti sejenak ditanda saktah dengan satu tarikan nafas sebelumnya, Kemudian dilanjutkan tanpa mengambil nafas baru.",
      link: "https://www.youtube.com/embed/GsD2OwL5RU0"
    }, {
      _id: 'gh-t',
      nama: "Tashil",
      keterangan: "Tas-hil mempunyai akar kata سَهُلَ yang artinya mudah. Adapun yang dimaksud bacaan tashil menurut ulama Qurra’ adalah upaya memindahkan bacaan ayat-ayat al-Quran dengan cara memindahkan harakat atau membuang huruf tertentu. Tujuannya adalah agar lafadh tersebut tidak sukar diucapkan.\n\nContoh Bacaan: Dalam Al Qur'an riwayat Hafs 'an 'Ashim yang sering kita baca di Al Qur'an cetakan Indonesia terdapat pada surah Fussilat ayat 44.\n\nTanda: dua hamzah qatha' ءَاَ.\n\nBacaan: tertulis ءَاَعْجَمِيٌّ maka dibaca اٰعْجَمِيٌّ. \n\nCara Baca: Menggabungkan dua hamzah qatha' (qatha' adalah hamzah yang tetap dibaca) menjadi satu bacaan, Dibaca 2 harakat.",
      link: "https://www.youtube.com/embed/ujZh5Q296gE"
    }]
  }, {
    _id: 'wi',
    nama: "Waqaf dan Ibtida'", 
    keterangan: "Tempat berhenti dan awalan dalam melanjutkan bacaan Al Qur'an.",
    comingsoon: true
  }]

  constructor() {}
}
