import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { News } from '@/models/News'
import { Product } from '@/models/Product'

const dummyArticles = [
  {
    title: 'The Art of Slow Pottery: Finding Peace in Clay',
    date: '12 JANUARY 2024',
    excerpt: 'In a world moving faster than ever, pottery teaches us the forgotten art of stillness. Every vessel begins with patience, not perfection.',
    subheading: 'There is a reason ancient civilizations across every continent turned to clay. It is one of the few materials that responds not to force, but to intention.',
    paragraphs: [
      'Pottery demands presence. You cannot shape clay while distracted — it collapses, cracks, or spins off center the moment your attention drifts. In this way, the wheel becomes a kind of meditation. The hands learn what the mind cannot fully articulate: that beauty emerges from sustained, gentle attention.',
      'At Homlab, we believe every piece carries the memory of its making. The slight asymmetry in a rim, the shadow left by a thumb — these are not flaws. They are signatures. Proof that something alive touched something raw and left it changed.',
      'Our process begins with sourcing local clay, mixed with organic matter to improve texture and reduce carbon impact. Each batch is wedged by hand for twenty minutes before it ever meets the wheel — a ritual that aligns the clay and, in some ways, the maker.',
    ],
    author: 'Article by Homlab',
    tags: ['pottery', 'craft', 'mindfulness'],
    imageUrls: ['/images/news/img-1.png', '/images/news/img-2.png', '/images/news/img-3.png'],
  },
  {
    title: 'Biofabrication and the Future of Sustainable Ceramics',
    date: '28 FEBRUARY 2024',
    excerpt: 'What if the next generation of pottery was grown, not fired? We explore where biotechnology meets ancient craft.',
    subheading: 'The ceramics industry has remained largely unchanged for millennia. But a new wave of material science is beginning to ask uncomfortable questions about heat, energy, and what we leave behind.',
    paragraphs: [
      'Traditional kiln firing consumes enormous energy — a single bisque firing can reach 1000°C and run for twelve hours. For small studios, this is unavoidable. But researchers are now developing bio-ceramic composites that harden at room temperature through microbial processes, reducing energy use by up to 80%.',
      'Homlab has been quietly experimenting with mycelium-bound clay composites for two years. The results are promising: vessels that are lighter, with a naturally matte finish, and fully compostable at end of life. They do not replace traditional stoneware — they offer a different category of object entirely.',
      'We are not claiming to have solved the problem. We are asking better questions about what sustainability in craft can actually look like when taken seriously, beyond marketing language and into material reality.',
    ],
    author: 'Article by Homlab',
    tags: ['sustainability', 'biofabrication', 'innovation'],
    imageUrls: ['/images/news/img-4.png', '/images/news/img-5.png', '/images/news/img-6.png'],
  },
  {
    title: 'Volumes From The Archive: Revisiting Our First Collection',
    date: '15 MARCH 2024',
    excerpt: 'Three years on, we look back at the pieces that started it all — and what they still mean to us today.',
    subheading: 'The first collection was never meant to be sold. It was made to answer a question: could functional objects carry emotional weight without resorting to decoration?',
    paragraphs: [
      'Twelve pieces. No glaze. No surface pattern. Just form and the natural color of the clay body, ranging from pale bone to deep iron-red depending on firing position in the kiln. We called it Archive because we intended it as a record — of a moment, a process, a way of thinking about objects.',
      'What surprised us was how people responded. Customers would describe the pieces in terms we had not anticipated — grounded, honest, quiet. One buyer wrote to say her Eggware mug had become part of her morning ritual, and that she felt something shift in her when she held it. We did not know then how to respond to that. We are still learning.',
      'Looking back, the Archive collection taught us that restraint is not the same as simplicity. Restraint is a choice made under pressure. Simplicity is what remains when every unnecessary thing has been removed. We were aiming for the latter and stumbled into something closer to the former. We are still chasing it.',
    ],
    author: 'Article by Homlab',
    tags: ['archive', 'collection', 'design'],
    imageUrls: ['/images/news/img-7.png', '/images/news/img-1.png', '/images/news/img-4.png'],
  },
  {
    title: 'On Imperfection: Why We Stopped Fixing Our Mistakes',
    date: '3 APRIL 2024',
    excerpt: 'A small crack in the rim led to a long conversation about what we actually value in handmade objects.',
    subheading: 'The Japanese concept of wabi-sabi — finding beauty in imperfection and transience — is often cited in craft circles. But citing it and actually practicing it are very different things.',
    paragraphs: [
      'We had a batch of twelve bowls come out of the kiln with a slight lean. Not dramatic — perhaps two degrees off vertical. Structurally sound, functionally perfect. Our instinct was to discount them, label them as seconds. Instead, we paused and asked why.',
      'The answer, when it came, was uncomfortable: we were applying industrial standards to handmade objects. We were treating slight variation as failure rather than as evidence of a human hand. The bowls were not wrong. Our expectations were.',
      'We kept the bowls. We photographed them carefully, showing the lean without apology. They sold out in four days. Several buyers specifically mentioned the lean as the reason they chose those pieces over others in the range. Imperfection, it turns out, is not a problem to be solved. It is a signal that something real was made by someone present.',
    ],
    author: 'Article by Homlab',
    tags: ['philosophy', 'craft', 'wabi-sabi'],
    imageUrls: ['/images/news/img-2.png', '/images/news/img-5.png', '/images/news/img-7.png'],
  },
]

const dummyProducts = [
  {
    name: 'Eggware Mug',
    description: 'A hand-thrown mug with an organic, egg-like form. Comfortable to hold, satisfying to use. Made from local stoneware clay with a natural ash glaze.',
    price: 285000,
    category: 'Mug',
    imageUrls: ['https://picsum.photos/seed/mug1/600/600', 'https://picsum.photos/seed/mug1b/600/600', 'https://picsum.photos/seed/mug1c/600/600'],
  },
  {
    name: 'Terrain Bowl',
    description: 'Inspired by aerial views of eroded landscape. Each bowl is unique — the surface texture is created by pressing natural materials into the clay before firing.',
    price: 320000,
    category: 'Bowl',
    imageUrls: ['https://picsum.photos/seed/bowl1/600/600', 'https://picsum.photos/seed/bowl1b/600/600', 'https://picsum.photos/seed/bowl1c/600/600'],
  },
  {
    name: 'Archive Vase',
    description: 'Tall, unglazed stoneware vase with a quiet, architectural presence. Designed to hold a single stem or stand alone. Fired in a wood kiln for a natural carbon blush.',
    price: 450000,
    category: 'Vase',
    imageUrls: ['https://picsum.photos/seed/vase1/600/600', 'https://picsum.photos/seed/vase1b/600/600', 'https://picsum.photos/seed/vase1c/600/600'],
  },
  {
    name: 'Shoreline Plate',
    description: 'A wide, shallow plate with a rippled rim inspired by tidal patterns. Ideal for serving or display. Glazed in a soft oceanic blue-grey.',
    price: 275000,
    category: 'Plate',
    imageUrls: ['https://picsum.photos/seed/plate1/600/600', 'https://picsum.photos/seed/plate1b/600/600', 'https://picsum.photos/seed/plate1c/600/600'],
  },
  {
    name: 'Ember Cup',
    description: 'A small, handleless cup designed for tea or espresso. The warm terracotta glaze deepens with heat, shifting from amber to deep rust in your hands.',
    price: 195000,
    category: 'Cup',
    imageUrls: ['https://picsum.photos/seed/cup1/600/600', 'https://picsum.photos/seed/cup1b/600/600', 'https://picsum.photos/seed/cup1c/600/600'],
  },
  {
    name: 'Fossil Tray',
    description: 'A rectangular tray with imprinted leaf patterns pressed directly into the clay. Each piece captures a different impression. Unglazed, oiled finish.',
    price: 360000,
    category: 'Tray',
    imageUrls: ['https://picsum.photos/seed/tray1/600/600', 'https://picsum.photos/seed/tray1b/600/600', 'https://picsum.photos/seed/tray1c/600/600'],
  },
  {
    name: 'Lunar Pitcher',
    description: 'A tall pitcher with a wide belly and narrow neck. The matte white glaze has a subtle crater-like texture from volcanic ash mixed into the surface.',
    price: 520000,
    category: 'Pitcher',
    imageUrls: ['https://picsum.photos/seed/pitcher1/600/600', 'https://picsum.photos/seed/pitcher1b/600/600', 'https://picsum.photos/seed/pitcher1c/600/600'],
  },
  {
    name: 'Grove Canister',
    description: 'A lidded canister for storing tea, coffee, or spices. The fitted lid creates an airtight seal. Glazed in deep forest green with a raw clay foot ring.',
    price: 395000,
    category: 'Canister',
    imageUrls: ['https://picsum.photos/seed/canister1/600/600', 'https://picsum.photos/seed/canister1b/600/600', 'https://picsum.photos/seed/canister1c/600/600'],
  },
  {
    name: 'Salt Cup',
    description: 'A pinch pot designed specifically as a salt cellar. Small enough to keep beside the stove, beautiful enough to serve at the table. Unglazed interior.',
    price: 145000,
    category: 'Cup',
    imageUrls: ['https://picsum.photos/seed/salt1/600/600', 'https://picsum.photos/seed/salt1b/600/600', 'https://picsum.photos/seed/salt1c/600/600'],
  },
  {
    name: 'Dusk Planter',
    description: 'A squat, wide-mouthed planter with a drainage hole and matching saucer. The gradient glaze shifts from warm copper at the rim to deep charcoal at the base.',
    price: 480000,
    category: 'Planter',
    imageUrls: ['https://picsum.photos/seed/planter1/600/600', 'https://picsum.photos/seed/planter1b/600/600', 'https://picsum.photos/seed/planter1c/600/600'],
  },
]

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Seed not allowed in production' }, { status: 403 })
  }
  try {
    await connectDB()
    await News.deleteMany({})
    await News.insertMany(dummyArticles)
    await Product.deleteMany({})
    await Product.collection.dropIndex('slug_1').catch(() => {})
    await Product.insertMany(dummyProducts)
    return NextResponse.json({ message: '4 articles and 10 products seeded successfully' })
  } catch (err: any) {
    console.error('Seed error:', err)
    return NextResponse.json({ error: err.message ?? 'Seed failed' }, { status: 500 })
  }
}
