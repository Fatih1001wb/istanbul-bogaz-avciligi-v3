export const mockCommunityPosts = [
  {
    id: '1',
    author: { username: 'bogaz_balikcisi', avatarColor: 'bg-brand-100 text-brand-700' },
    content:
      'Sabah erken Bebek sahilinden güzel bir lüfer avı! Rüzgar hafif, su berrak. 3 adet 28 cm üzeri, hepsini geri bıraktım.',
    image_url:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop&q=80',
    created_at: new Date(Date.now() - 45 * 60000).toISOString(),
    likes: 24,
    comments: 8,
  },
  {
    id: '2',
    author: { username: 'deniz_ustasi', avatarColor: 'bg-sea/10 text-sea dark:bg-sea/20' },
    content:
      'Kandilli önlerinde palamut sürüsü var, ama boyları küçük. 25 cm altını almayın arkadaşlar, sezon kurallarına dikkat!',
    image_url: null,
    created_at: new Date(Date.now() - 3 * 3600000).toISOString(),
    likes: 41,
    comments: 15,
  },
  {
    id: '3',
    author: { username: 'hamsi_kaptan', avatarColor: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' },
    content:
      'Sarıyer\'de hamsi bolluğu başladı. Gece avı için ideal koşullar — ay ışığı yok, dalga sakin.',
    image_url:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop&q=80',
    created_at: new Date(Date.now() - 6 * 3600000).toISOString(),
    likes: 67,
    comments: 22,
  },
]
