import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { StorageService } from '../storage/storage.service';

export class Surat{
	urutan: number;
	nama: string;
	alias: string[];
	arti: string;
	ayat?: any[];
	jumlahAyat: number;
	turun?: string;
	arab?: any;
	order?: number;
	playlist?: boolean;
	nilai?: any;
}

export class Bookmark{
	urutan: number;
	ayat: number;
	open?: boolean;
}

@Injectable({
	providedIn: 'root'
})
export class QuranService {

	public surat = [{ 
		urutan: 1, nama: 'Al-Fatihah', alias: ['Al-Fatihah'], arti: 'Pembukaan', jumlahAyat: 7, turun: 'mekkah', arab: 'الفاتحة'
	}, { 
		urutan: 2, nama: 'Al-Baqarah', alias: ['Al-Baqarah'], arti: 'Sapi Betina', jumlahAyat: 286, turun: 'madinah', arab: 'البقرة'
	}, { 
		urutan: 3, nama: 'Ali ‘Imran', alias: ['Ali ‘Imran'], arti: 'Keluarga Imran', jumlahAyat: 200, turun: 'madinah', arab: 'آل عمران'
	}, { 
		urutan: 4, nama: 'An-Nisa’', alias: ['An-Nisa’'], arti: 'Wanita', jumlahAyat: 176, turun: 'madinah', arab: 'النّساء'
	}, { 
		urutan: 5, nama: 'Al-Ma’idah', alias: ['Al-Ma’idah'], arti: 'Hidangan Langit', jumlahAyat: 120, turun: 'madinah', arab: 'المائدة'
	}, { 
		urutan: 6, nama: 'Al-An’am', alias: ['Al-An’am'], arti: 'Hewan Ternak', jumlahAyat: 165, turun: 'mekkah', arab: 'الانعام'
	}, { 
		urutan: 7, nama: 'Al-A’raf', alias: ['Al-A’raf'], arti: 'Tempat Tertinggi', jumlahAyat: 206, turun: 'mekkah', arab: 'الأعراف'
	}, { 
		urutan: 8, nama: 'Al-Anfal', alias: ['Al-Anfal'], arti: 'Harta Rampasan Perang', jumlahAyat: 75, turun: 'madinah', arab: 'الأنفال'
	}, { 
		urutan: 9, nama: 'At-Taubah', alias: ['At-Taubah'], arti: 'Pengampunan', jumlahAyat: 129, turun: 'madinah', arab: 'التوبة‎‎'
	}, { 
		urutan: 10, nama: 'Yunus', alias: ['Yunus'], arti: 'Nabi Yunus', jumlahAyat: 109, turun: 'mekkah', arab: 'يونس'
	}, { 
		urutan: 11, nama: 'Hud', alias: ['Hud'], arti: 'Nabi Hud', jumlahAyat: 123, turun: 'mekkah', arab: 'هود'
	}, { 
		urutan: 12, nama: 'Yusuf', alias: ['Yusuf'], arti: 'Nabi Yusuf', jumlahAyat: 111, turun: 'mekkah', arab: 'يوسف'
	}, { 
		urutan: 13, nama: 'Ar-Ra’d', alias: ['Ar-Ra’d', "ar ra'd"], arti: 'Guruh', jumlahAyat: 43, turun: 'mekkah', arab: 'الرعد'
	}, { 
		urutan: 14, nama: 'Ibrahim', alias: ['Ibrahim'], arti: 'Nabi Ibrahim', jumlahAyat: 52, turun: 'mekkah', arab: 'إبراهيم'
	}, { 
		urutan: 15, nama: 'Al-Hijr', alias: ['Al-Hijr'], arti: 'Gunung Al Hijr', jumlahAyat: 99, turun: 'mekkah', arab: 'الحجر'
	}, { 
		urutan: 16, nama: 'An-Nahl', alias: ['An-Nahl'], arti: 'Lebah', jumlahAyat: 128, turun: 'mekkah', arab: 'النحل'
	}, { 
		urutan: 17, nama: 'Al-Isra’', alias: ['Al-Isra’'], arti: 'Perjalanan Malam', jumlahAyat: 111, turun: 'mekkah', arab: 'الإسراء'
	}, { 
		urutan: 18, nama: 'Al-Kahf', alias: ['Al-Kahf'], arti: 'Gua', jumlahAyat: 110, turun: 'mekkah', arab: 'الكهف'
	}, { 
		urutan: 19, nama: 'Maryam', alias: ['Maryam'], arti: 'Maryam', jumlahAyat: 98, turun: 'mekkah', arab: 'مريم'
	}, { 
		urutan: 20, nama: 'Ta Ha', alias: ['Ta Ha', 'thaha', 'taha', 'thoha', 'at thaha'], arti: 'Ta Ha', jumlahAyat: 135, turun: 'mekkah', arab: 'طه'
	}, { 
		urutan: 21, nama: 'Al-Anbiya', alias: ['Al-Anbiya'], arti: 'Nabi-Nabi', jumlahAyat: 112, turun: 'mekkah', arab: 'الأنبياء'
	}, { 
		urutan: 22, nama: 'Al-Hajj', alias: ['Al-Hajj'], arti: 'Haji', jumlahAyat: 78, turun: 'mekkah & madinah', arab: 'الحجّ'
	}, { 
		urutan: 23, nama: 'Al-Mu’minun', alias: ['Al-Mu’minun'], arti: 'Orang-Orang Mukmin', jumlahAyat: 118, turun: 'mekkah', arab: 'المؤمنون'
	}, { 
		urutan: 24, nama: 'An-Nur', alias: ['An-Nur'], arti: 'Cahaya', jumlahAyat: 64, turun: 'madinah', arab: 'النور'
	}, { 
		urutan: 25, nama: 'Al-Furqan', alias: ['Al-Furqan'], arti: 'Pembeda', jumlahAyat: 77, turun: 'mekkah', arab: 'الفرقان'
	}, { 
		urutan: 26, nama: 'Asy-Syu’ara’', alias: ['Asy-Syu’ara’'], arti: 'Penyair', jumlahAyat: 227, turun: 'mekkah', arab: 'الشعراء'
	}, { 
		urutan: 27, nama: 'An-Naml', alias: ['An-Naml'], arti: 'Semut', jumlahAyat: 93, turun: 'mekkah', arab: "النمل"
	}, { 
		urutan: 28, nama: 'Al-Qasas', alias: ['Al-Qasas', 'al qosos', 'alqosos', 'alqasas'], arti: 'Kisah', jumlahAyat: 88, turun: 'mekkah', arab: "القصص"
	}, { 
		urutan: 29, nama: 'Al-Ankabut', alias: ['Al-Ankabut'], arti: 'Laba-Laba', jumlahAyat: 69, turun: 'mekkah', arab: "العنكبوت"
	}, { 
		urutan: 30, nama: 'Ar-Rum', alias: ['Ar-Rum'], arti: 'Bangsa Romawi', jumlahAyat: 60, turun: 'mekkah', arab: "الروم"
	}, { 
		urutan: 31, nama: 'Luqman', alias: ['Luqman'], arti: 'Keluarga Luqman', jumlahAyat: 34, turun: 'mekkah', arab: "لقمان"
	}, { 
		urutan: 32, nama: 'As-Sajdah', alias: ['As-Sajdah'], arti: 'Sujud', jumlahAyat: 30, turun: 'mekkah', arab: "السجدة"
	}, { 
		urutan: 33, nama: 'Al-Ahzab', alias: ['Al-Ahzab'], arti: 'Golongan Yang Bersekutu', jumlahAyat: 73, turun: 'madinah', arab: "الْأحزاب"
	}, { 
		urutan: 34, nama: 'Saba’', alias: ['Saba’'], arti: 'Kaum Saba’', jumlahAyat: 54, turun: 'mekkah', arab: "سبأ"
	}, { 
		urutan: 35, nama: 'Fatir', alias: ['Fatir'], arti: 'Pencipta', jumlahAyat: 45, turun: 'mekkah', arab: "فاطر"
	}, { 
		urutan: 36, nama: 'Ya Sin', alias: ['Ya Sin'], arti: 'Yaasiin', jumlahAyat: 83, turun: 'mekkah', arab: "يس"
	}, { 
		urutan: 37, nama: 'As-Saffat', alias: ['As-Saffat'], arti: 'Barisan-Barisan', jumlahAyat: 182, turun: 'mekkah', arab: "الصافات"
	}, { 
		urutan: 38, nama: 'Sad', alias: ['Sad'], arti: 'Shaad', jumlahAyat: 88, turun: 'mekkah', arab: "ص"
	}, { 
		urutan: 39, nama: 'Az-Zumar', alias: ['Az-Zumar'], arti: 'Rombongan-Rombongan', jumlahAyat: 75, turun: 'mekkah', arab: "الزمر"
	}, { 
		urutan: 40, nama: 'Gafir', alias: ['Gafir'], arti: 'Maha Pengampun', jumlahAyat: 85, turun: 'mekkah', arab: "غافر"
	}, { 
		urutan: 41, nama: 'Fussilat', alias: ['Fussilat'], arti: 'Yang Dijelaskan', jumlahAyat: 54, turun: 'mekkah', arab: "فصلت"
	}, { 
		urutan: 42, nama: 'Asy-Syura', alias: ['Asy-Syura'], arti: 'Musyawarah', jumlahAyat: 53, turun: 'mekkah', arab: "الشورى"
	}, { 
		urutan: 43, nama: 'Az-Zukhruf', alias: ['Az-Zukhruf'], arti: 'Perhiasan', jumlahAyat: 89, turun: 'mekkah', arab: "الزخرف"
	}, { 
		urutan: 44, nama: 'Ad-Dukhan', alias: ['Ad-Dukhan'], arti: 'Kabut', jumlahAyat: 59, turun: 'mekkah', arab: "الدخان"
	}, { 
		urutan: 45, nama: 'Al-Jasiyah', alias: ['Al-Jasiyah'], arti: 'Yang Bertekuk Lutut', jumlahAyat: 37, turun: 'mekkah', arab: "الجاثية"
	}, { 
		urutan: 46, nama: 'Al-Ahqaf', alias: ['Al-Ahqaf'], arti: 'Bukit-Bukit Pasir', jumlahAyat: 35, turun: 'mekkah', arab: "الَأحقاف"
	}, { 
		urutan: 47, nama: 'Muhammad', alias: ['Muhammad'], arti: 'Nabi Muhammad', jumlahAyat: 38, turun: 'madinah', arab: "محمد"
	}, { 
		urutan: 48, nama: 'Al-Fath', alias: ['Al-Fath'], arti: 'Kemenangan', jumlahAyat: 29, turun: 'madinah', arab: "الفتح"
	}, { 
		urutan: 49, nama: 'Al-Hujurat', alias: ['Al-Hujurat'], arti: 'Kamar-Kamar', jumlahAyat: 18, turun: 'madinah', arab: "الحجرات"
	}, { 
		urutan: 50, nama: 'Qaf', alias: ['Qaf'], arti: 'Qaaf', jumlahAyat: 45, turun: 'mekkah', arab: "ق"
	}, { 
		urutan: 51, nama: 'Az-Zariyat', alias: ['Az-Zariyat'], arti: 'Angin Yang Menerbangkan', jumlahAyat: 60, turun: 'mekkah', arab: "الذاريات"
	}, { 
		urutan: 52, nama: 'At-Tur', alias: ['At-Tur'], arti: 'Bukit', jumlahAyat: 49, turun: 'mekkah', arab: "الطور"
	}, { 
		urutan: 53, nama: 'An-Najm', alias: ['An-Najm'], arti: 'Bintang', jumlahAyat: 62, turun: 'mekkah', arab: "النجم"
	}, { 
		urutan: 54, nama: 'Al-Qamar', alias: ['Al-Qamar'], arti: 'Bulan', jumlahAyat: 55, turun: 'mekkah', arab: "القمر"
	}, { 
		urutan: 55, nama: 'Ar-Rahman', alias: ['Ar-Rahman'], arti: 'Yang Maha Pemurah', jumlahAyat: 78, turun: 'mekkah & madinah', arab: "الرحمن"
	}, { 
		urutan: 56, nama: 'Al-Waqi’ah', alias: ['Al-Waqi’ah'], arti: 'Hari Kiamat', jumlahAyat: 96, turun: 'mekkah', arab: "الواقعة"
	}, { 
		urutan: 57, nama: 'Al-Hadid', alias: ['Al-Hadid'], arti: 'Besi', jumlahAyat: 29, turun: 'madinah', arab: "الحديد"
	}, { 
		urutan: 58, nama: 'Al-Mujadilah', alias: ['Al-Mujadilah'], arti: 'Wanita Yang Mengajukan Gugatan', jumlahAyat: 22, turun: 'madinah', arab: "المجادلة"
	}, { 
		urutan: 59, nama: 'Al-Hasyr', alias: ['Al-Hasyr'], arti: 'Pengusiran', jumlahAyat: 24, turun: 'madinah', arab: "الحشر"
	}, { 
		urutan: 60, nama: 'Al-Mumtahanah', alias: ['Al-Mumtahanah'], arti: 'Wanita Yang Diuji', jumlahAyat: 13, turun: 'madinah', arab: "الممتحنة"
	}, { 
		urutan: 61, nama: 'As-Saff', alias: ['As-Saff'], arti: 'Satu Barisan', jumlahAyat: 14, turun: 'madinah', arab: "الصف"
	}, { 
		urutan: 62, nama: 'Al-Jumu’ah', alias: ['Al-Jumu’ah'], arti: 'Hari Jum’at', jumlahAyat: 11, turun: 'madinah', arab: "الجمعة"
	}, { 
		urutan: 63, nama: 'Al-Munafiqun', alias: ['Al-Munafiqun'], arti: 'Orang-Orang Yang Munafik', jumlahAyat: 11, turun: 'madinah', arab: "المنافقون"
	}, { 
		urutan: 64, nama: 'At-Tagabun', alias: ['At-Tagabun'], arti: 'Hari Dinampakkan Segala Kesalahan', jumlahAyat: 18, turun: 'madinah', arab: "التغابن"
	}, { 
		urutan: 65, nama: 'At-Talaq', alias: ['At-Talaq'], arti: 'Talak', jumlahAyat: 12, turun: 'madinah', arab: "الطلاق"
	}, { 
		urutan: 66, nama: 'At-Tahrim', alias: ['At-Tahrim'], arti: 'Mengharamkan', jumlahAyat: 12, turun: 'madinah', arab: "التحريم"
	}, { 
		urutan: 67, nama: 'Al-Mulk', alias: ['Al-Mulk'], arti: 'Kerajaan', jumlahAyat: 30, turun: 'mekkah', arab: "الملك"
	}, { 
		urutan: 68, nama: 'Al-Qalam', alias: ['Al-Qalam'], arti: 'Pena', jumlahAyat: 52, turun: 'mekkah', arab: "القلم"
	}, { 
		urutan: 69, nama: 'Al-Haqqah', alias: ['Al-Haqqah'], arti: 'Hari Kiamat', jumlahAyat: 52, turun: 'mekkah', arab: "الحآقة"
	}, { 
		urutan: 70, nama: 'Al-Ma’arij', alias: ['Al-Ma’arij'], arti: 'Tempat Naik', jumlahAyat: 44, turun: 'mekkah', arab: "المعارج"
	}, { 
		urutan: 71, nama: 'Nuh', alias: ['Nuh'], arti: 'Nabi Nuh', jumlahAyat: 28, turun: 'mekkah', arab: "نوح"
	}, { 
		urutan: 72, nama: 'Al-Jinn', alias: ['Al-Jinn'], arti: 'Jin', jumlahAyat: 28, turun: 'mekkah', arab: "الجن"
	}, { 
		urutan: 73, nama: 'Al-Muzammil', alias: ['Al-Muzammil'], arti: 'Orang Yang Berselimut', jumlahAyat: 20, turun: 'mekkah', arab: "المزمل"
	}, { 
		urutan: 74, nama: 'A-Muddassir', alias: ['A-Muddassir'], arti: 'Orang Yang Berkumpul', jumlahAyat: 56, turun: 'mekkah', arab: "المدثر"
	}, { 
		urutan: 75, nama: 'Al-Qiyamah', alias: ['Al-Qiyamah'], arti: 'Kiamat', jumlahAyat: 40, turun: 'mekkah', arab: "القيامة"
	}, { 
		urutan: 76, nama: 'Al-Insan', alias: ['Al-Insan'], arti: 'Manusia', jumlahAyat: 31, turun: 'madinah', arab: "الإنسان"
	}, { 
		urutan: 77, nama: 'Al-Mursalat', alias: ['Al-Mursalat'], arti: 'Malaikat-Malaikat Yang Diutus', jumlahAyat: 50, turun: 'mekkah', arab: "المرسلات"
	}, { 
		urutan: 78, nama: 'An-Naba’', alias: ['An-Naba’'], arti: 'Berita Besar', jumlahAyat: 40, turun: 'mekkah', arab: "النبأ"
	}, { 
		urutan: 79, nama: 'An-Nazi’at', alias: ['An-Nazi’at'], arti: 'Malaikat-Malaikat Yang Mencabut', jumlahAyat: 46, turun: 'mekkah', arab: "النازعات"
	}, { 
		urutan: 80, nama: '‘Abasa', alias: ['‘Abasa'], arti: 'Ia Bermuka Masam', jumlahAyat: 42, turun: 'mekkah', arab: "عبس"
	}, { 
		urutan: 81, nama: 'At-Takwir', alias: ['At-Takwir'], arti: 'Menggulung', jumlahAyat: 29, turun: 'mekkah', arab: "التكوير"
	}, { 
		urutan: 82, nama: 'Al-Infitar', alias: ['Al-Infitar'], arti: 'Terbelah', jumlahAyat: 19, turun: 'mekkah', arab: "الإنفطار"
	}, { 
		urutan: 83, nama: 'Al-Mutaffifin', alias: ['Al-Mutaffifin'], arti: 'Orang-Orang Yang Curang', jumlahAyat: 36, turun: 'mekkah', arab: "المطففين"
	}, { 
		urutan: 84, nama: 'Al-Insyiqaq', alias: ['Al-Insyiqaq'], arti: 'Terbelah', jumlahAyat: 25, turun: 'mekkah', arab: "الإنشقاق"
	}, { 
		urutan: 85, nama: 'Al-Buruj', alias: ['Al-Buruj'], arti: 'Gugusan Bintang', jumlahAyat: 22, turun: 'mekkah', arab: "البروج"
	}, { 
		urutan: 86, nama: 'At-Thariq', alias: ['At-Thariq'], arti: 'Yang Datang Di Malam Hari', jumlahAyat: 17, turun: 'mekkah', arab: "الطارق"
	}, { 
		urutan: 87, nama: 'Al-A’la', alias: ['Al-A’la'], arti: 'Yang Paling Tinggi', jumlahAyat: 19, turun: 'mekkah', arab: "الأعلى"
	}, { 
		urutan: 88, nama: 'Al-Gasyiyah', alias: ['Al-Gasyiyah'], arti: 'Hari Pembalasan', jumlahAyat: 26, turun: 'mekkah', arab: "الغاشية"
	}, { 
		urutan: 89, nama: 'Al-Fajr', alias: ['Al-Fajr'], arti: 'Fajar', jumlahAyat: 30, turun: 'mekkah', arab: "الفجر"
	}, { 
		urutan: 90, nama: 'Al-Balad', alias: ['Al-Balad'], arti: 'Negeri', jumlahAyat: 20, turun: 'mekkah', arab: "البلد"
	}, { 
		urutan: 91, nama: 'Asy-Syams', alias: ['Asy-Syams'], arti: 'Matahari', jumlahAyat: 15, turun: 'mekkah', arab: "الشمس"
	}, { 
		urutan: 92, nama: 'Al-Lail', alias: ['Al-Lail'], arti: 'Malam', jumlahAyat: 21, turun: 'mekkah', arab: "اليل"
	}, { 
		urutan: 93, nama: 'Ad-Dhuha', alias: ['Ad-Dhuha'], arti: 'Waktu Dhuha', jumlahAyat: 11, turun: 'mekkah', arab: "الضحى‎‎"
	}, { 
		urutan: 94, nama: 'Al-Insyirah', alias: ['Al-Insyirah'], arti: 'Melapangkan', jumlahAyat: 8, turun: 'mekkah', arab: "الإنشراح‎‎"
	}, { 
		urutan: 95, nama: 'At-Tin', alias: ['At-Tin'], arti: 'Buah Tin', jumlahAyat: 8, turun: 'mekkah', arab: "التينِ"
	}, { 
		urutan: 96, nama: 'Al-‘Alaq', alias: ['Al-‘Alaq'], arti: 'Segumpal Darah', jumlahAyat: 19, turun: 'mekkah', arab: "العلق"
	}, { 
		urutan: 97, nama: 'Al-Qadr', alias: ['Al-Qadr'], arti: 'Kemuliaan', jumlahAyat: 5, turun: 'mekkah', arab: "القدرِ"
	}, { 
		urutan: 98, nama: 'Al-Bayyinah', alias: ['Al-Bayyinah'], arti: 'Pembuktian', jumlahAyat: 8, turun: 'madinah', arab: "البينة"
	}, { 
		urutan: 99, nama: 'Az-Zalzalah', alias: ['Az-Zalzalah'], arti: 'Kegoncangan', jumlahAyat: 8, turun: 'madinah', arab: "الزلزلة‎‎"
	}, { 
		urutan: 100, nama: 'Al-‘Adiyat', alias: ['Al-‘Adiyat'], arti: 'Beralari Kencang', jumlahAyat: 11, turun: 'mekkah', arab: "العاديات‎‎"
	}, { 
		urutan: 101, nama: 'Al-Qari’ah', alias: ['Al-Qari’ah'], arti: 'Hari Kiamat', jumlahAyat: 11, turun: 'mekkah', arab: "القارعة‎‎"
	}, { 
		urutan: 102, nama: 'At-Takasur', alias: ['At-Takasur'], arti: 'Bermegah-megahan', jumlahAyat: 8, turun: 'mekkah', arab: "التكاثر‎‎"
	}, { 
		urutan: 103, nama: 'Al-‘Asr', alias: ['Al-‘Asr'], arti: 'Waktu', jumlahAyat: 3, turun: 'mekkah', arab: "العصر"
	}, { 
		urutan: 104, nama: 'Al-Humazah', alias: ['Al-Humazah'], arti: 'Pengumpat', jumlahAyat: 9, turun: 'mekkah', arab: "الهمزة‎‎"
	}, { 
		urutan: 105, nama: 'Al-Fil', alias: ['Al-Fil'], arti: 'Gajah', jumlahAyat: 5, turun: 'mekkah', arab: "الفيل"
	}, { 
		urutan: 106, nama: 'Quraisy', alias: ['Quraisy'], arti: 'Suku Qurais', jumlahAyat: 4, turun: 'mekkah', arab: "قريش"
	}, { 
		urutan: 107, nama: 'Al-Ma’un', alias: ['Al-Ma’un'], arti: 'Barang Yang Berguna', jumlahAyat: 7, turun: 'mekkah', arab: "الماعون"
	}, { 
		urutan: 108, nama: 'Al-Kausar', alias: ['Al-Kausar'], arti: 'Nikmat Yang Berlimpah', jumlahAyat: 3, turun: 'mekkah', arab: "الكوثر"
	}, { 
		urutan: 109, nama: 'Al-Kafirun', alias: ['Al-Kafirun'], arti: 'Orang-Orang Kafir', jumlahAyat: 6, turun: 'mekkah', arab: "الكافرون"
	}, { 
		urutan: 110, nama: 'An-Nasr', alias: ['An-Nasr'], arti: 'Pertolongan', jumlahAyat: 3, turun: 'madinah', arab: "النصر‎‎"
	}, { 
		urutan: 111, nama: 'Al-Lahab', alias: ['Al-Lahab'], arti: 'Gejolak Api', jumlahAyat: 5, turun: 'mekkah', arab: "اللهب‎‎"
	}, { 
		urutan: 112, nama: 'Al-Ikhlas', alias: ['Al-Ikhlas'], arti: 'Ikhlas', jumlahAyat: 4, turun: 'mekkah', arab: "الإخلاص‎‎"
	}, { 
		urutan: 113, nama: 'Al-Falaq', alias: ['Al-Falaq'], arti: 'Waktu Subuh', jumlahAyat: 5, turun: 'mekkah', arab: "الفلق"
	}, { 
		urutan: 114, nama: 'An-Nas', alias: ['An-Nas'], arti: 'Umat Manusia', jumlahAyat: 6, turun: 'mekkah', arab: "الناس"
	}]

	public juz = [];

	public bookmark: Bookmark = {
		urutan: 0,
		ayat: 0,
		open: false
	};

	constructor(
		private httpClient: HttpClient,
		private storage: StorageService) { }

	ambilSurat(urutan){
		return this.httpClient.get('assets/surat/' + urutan + '.json').toPromise();
	}
}
