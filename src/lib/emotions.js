// 6 Basic Human Emotions based on Paul Ekman's research
export const EMOTIONS = [
  {
    id: 'joy',
    name: 'Joy',
    nameId: 'Senang',
    icon: 'Smile',
    color: '#FCD34D',
    description: 'Perasaan bahagia, puas, bersyukur. Merupakan emosi positif yang memberi energi dan motivasi.',
    tips: [
      'Rayakan pencapaian kecil',
      'Bersyukur atas hal-hal baik dalam hidup',
      'Bagikan kebahagiaan dengan orang lain'
    ],
    triggers: [
      'Mendapat kabar baik',
      'Berhasil menyelesaikan tugas',
      'Bersama orang tercinta'
    ]
  },
  {
    id: 'sadness',
    name: 'Sadness',
    nameId: 'Sedih',
    icon: 'Frown',
    color: '#60A5FA',
    description: 'Perasaan kehilangan, kecewa, patah hati. Emosi alami yang membantu proses penyembuhan.',
    tips: [
      'Izinkan diri untuk merasakan',
      'Beri waktu untuk berduka',
      'Cari dukungan dari orang terdekat'
    ],
    triggers: [
      'Kehilangan orang yang dicintai',
      'Kegagalan atau kekecewaan',
      'Kesepian'
    ]
  },
  {
    id: 'anger',
    name: 'Anger',
    nameId: 'Marah',
    icon: 'Angry',
    color: '#F87171',
    description: 'Perasaan frustrasi, jengkel, kesal. Emosi yang сигнализирует о несправедливости atau ancaman.',
    tips: [
      'Tarik napas dalam-dalam',
      'Identifikasi sumber kemarahan',
      'Salurkan energi dengan cara positif'
    ],
    triggers: [
      'Dipersalahkan tanpa alasan',
      'Melihat ketidakadilan',
      'Terhalang dari tujuan'
    ]
  },
  {
    id: 'fear',
    name: 'Fear',
    nameId: 'Takut',
    icon: 'AlertTriangle',
    color: '#A78BFA',
    description: 'Perasaan cemas, khawatir, panik. Emosi防守 yang membantu kita menghindari bahaya.',
    tips: [
      'Hadapi ketakutan secara bertahap',
      'Fokus pada hal yang bisa dikontrol',
      'Gunakan teknik relaksasi'
    ],
    triggers: [
      'Menanti hasil penting',
      'Situasi yang tidak pasti',
      'Ancaman nyata atau imajiner'
    ]
  },
  {
    id: 'surprise',
    name: 'Surprise',
    nameId: 'Terkejut',
    icon: 'Sparkles',
    color: '#FB923C',
    description: 'Perasaan kaget, tercengang, terbelalak. Emosi singkat yang terjadi tiba-tiba.',
    tips: [
      'Berikan waktu untuk memproses',
      'Ambil pelajaran dari pengalaman',
      'Gunakan untuk beradaptasi'
    ],
    triggers: [
      'Mendapat kabar tak terduga',
      'Kejutan dari orang lain',
      'Peristiwa di luar kendali'
    ]
  },
  {
    id: 'disgust',
    name: 'Disgust',
    nameId: 'Jijik',
    icon: 'ThumbsDown',
    color: '#4ADE80',
    description: 'Perasaan muak, tidak suka, aversion. Emosi yang membantu kita menghindari hal berbahaya.',
    tips: [
      'Identifikasi apa yang memicu',
      'Jauhi sumber disgust jika memungkinkan',
      'Jangan memaksakan diri'
    ],
    triggers: [
      'Melihat atau mencium sesuatu yang tidak menyenangkan',
      'Melakukan hal yang bertentangan dengan nilai',
      'Bertemu orang yang tidak.disukai'
    ]
  }
]

export const getEmotionById = (id) => {
  return EMOTIONS.find(e => e.id === id)
}

export const getEmotionColor = (id) => {
  const emotion = getEmotionById(id)
  return emotion ? emotion.color : '#94A3B8'
}
