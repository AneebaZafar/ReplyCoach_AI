/**
 * Converts Urdu script into natural Roman Urdu (Latin script)
 * tailored for Pakistani conversational conventions.
 */

const COMMON_URDU_WORDS: Record<string, string> = {
  'میں': 'main',
  'ہم': 'hum',
  'تم': 'tum',
  'آپ': 'aap',
  'وہ': 'woh',
  'یہ': 'yeh',
  'ہے': 'hai',
  'ہیں': 'hain',
  'ہو': 'ho',
  'ہوں': 'hoon',
  'تھا': 'tha',
  'تھی': 'thi',
  'تھے': 'the',
  'اور': 'aur',
  'سے': 'se',
  'کو': 'ko',
  'کا': 'ka',
  'کی': 'ki',
  'کے': 'ke',
  'پر': 'par',
  'تک': 'tak',
  'میں نے': 'maine',
  'کر': 'kar',
  'کرنا': 'karna',
  'کیا': 'kya',
  'کیوں': 'kyun',
  'کیسے': 'kaise',
  'کب': 'kab',
  'کہاں': 'kahan',
  'نہیں': 'nahi',
  'نہ': 'na',
  'ہاں': 'haan',
  'جی': 'jee',
  'بہت': 'bohat',
  'اچھا': 'acha',
  'اچھی': 'achi',
  'اچھے': 'ache',
  'شکریہ': 'shukriya',
  'سلام': 'salam',
  'وعلیکم': 'walaikum',
  'کام': 'kaam',
  'بات': 'baat',
  'وقت': 'waqt',
  'سال': 'saal',
  'مہینہ': 'mahina',
  'دن': 'din',
  'پروجیکٹ': 'project',
  'تجربہ': 'tajurba',
  'تعلیم': 'taleem',
  'ڈگری': 'degree',
  'نوکری': 'naukri',
  'جاب': 'job',
  'انٹرویو': 'interview',
  'کمپنی': 'company',
  'ٹیم': 'team',
  'لیڈر': 'leader',
  'مسئلہ': 'masla',
  'حل': 'hal',
  'مدد': 'madad',
  'سیکھنا': 'seekhna',
  'پڑھنا': 'parhna',
  'لکھنا': 'likhna',
  'بولنا': 'bolna',
  'سمجھنا': 'samajhna',
  'چاہتا': 'chahta',
  'چاہتی': 'chahti',
  'سکتا': 'sakta',
  'سکتی': 'sakti',
  'سکتے': 'sakte',
};

const CHAR_MAP: Record<string, string> = {
  'ا': 'a',
  'آ': 'aa',
  'ب': 'b',
  'پ': 'p',
  'ت': 't',
  'ٹ': 't',
  'ث': 's',
  'ج': 'j',
  'چ': 'ch',
  'ح': 'h',
  'خ': 'kh',
  'د': 'd',
  'ڈ': 'd',
  'ذ': 'z',
  'ر': 'r',
  'ڑ': 'r',
  'ز': 'z',
  'ژ': 'zh',
  'س': 's',
  'ش': 'sh',
  'ص': 's',
  'ض': 'z',
  'ط': 't',
  'ظ': 'z',
  'ع': 'a',
  'غ': 'gh',
  'ف': 'f',
  'ق': 'q',
  'ک': 'k',
  'گ': 'g',
  'ل': 'l',
  'م': 'm',
  'ن': 'n',
  'ں': 'n',
  'و': 'o',
  'ہ': 'h',
  'ۂ': 'h',
  'ھ': 'h',
  'ء': '',
  'ی': 'i',
  'ے': 'e',
  'ئ': 'i',
  'ۃ': 't',
  'ؤ': 'o',
  '۰': '0',
  '۱': '1',
  '۲': '2',
  '۳': '3',
  '۴': '4',
  '۵': '5',
  '۶': '6',
  '۷': '7',
  '۸': '8',
  '۹': '9',
  '،': ',',
  '؛': ';',
  '؟': '?',
  '۔': '.',
};

/**
 * Transliterates Urdu text to Roman Urdu.
 * If the input already contains Latin letters, preserves them.
 */
export function urduToRomanUrdu(urduText: string): string {
  if (!urduText) return '';

  const words = urduText.split(/\s+/);
  const romanWords = words.map((word) => {
    // Clean punctuation
    const cleanWord = word.replace(/[۔،؟!,.]/g, '');

    // Check exact dictionary match
    if (COMMON_URDU_WORDS[cleanWord]) {
      return COMMON_URDU_WORDS[cleanWord];
    }

    // Letter-by-letter transliteration
    let roman = '';
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (CHAR_MAP[char] !== undefined) {
        roman += CHAR_MAP[char];
      } else {
        roman += char;
      }
    }

    // Clean double vowels
    roman = roman
      .replace(/aa+/g, 'aa')
      .replace(/ee+/g, 'ee')
      .replace(/oo+/g, 'oo')
      .replace(/ii+/g, 'ee');

    return roman;
  });

  return romanWords.join(' ');
}
