import * as dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import { categories } from './drizzle/schema/categories.schema'
import { movies } from './drizzle/schema/movies.schema'

dotenv.config()

const CATEGORIES = [
	{
		title: 'Классика',
		slug: 'classic'
	},
	{
		title: 'Гоночные фильмы',
		slug: 'racing'
	},
	{
		title: 'Кино Балабанова',
		slug: 'balabanov'
	}
]

const MOVIES = [
	{
		title: 'Крёстный отец',
		slug: 'the-godfather',
		description:
			'Aмериканская мафия. Сила семьи. Драма о том, как сын дона Корлеоне втягивается в мир, где правят честь и кровь.',
		poster: '/posters/the-godfather.webp',
		banner: '/banners/the-godfather.webp',
		duration: 175,
		releaseDate: null,
		releaseYear: 1972,
		ratingAge: 16,
		country: 'США',
		category: 'classic'
	},
	{
		title: 'Крестный отец 2',
		slug: 'the-godfather-2',
		description:
			'История семьи Корлеоне продолжается: параллельно — путь юного Вито и падение Майкла.',
		poster: '/posters/the-godfather-2.webp',
		banner: null,
		duration: 202,
		releaseDate: new Date('2026-12-31'),
		releaseYear: 1974,
		ratingAge: 16,
		country: 'США',
		category: 'classic'
	},
	{
		title: 'Форрест Гамп',
		slug: 'forrest-gump',
		description:
			'Простой парень с чистой душой проживает эпоху перемен и сам становится их частью. Невинность, любовь и великая американская история в одном сердце.',
		poster: '/posters/forrest-gump.webp',
		banner: '/banners/forrest-gump.webp',
		duration: 142,
		releaseDate: null,
		releaseYear: 1994,
		ratingAge: 18,
		country: 'США',
		category: 'classic'
	},
	{
		title: 'Однажды в Америке',
		slug: 'once-upon-a-time-in-america',
		description:
			'Дружба, предательство и тень гангстерской эпохи. Долгий путь от детских улиц до мрачных разборок взрослых, где прошлое всегда догоняет.',
		poster: '/posters/once-upon-a-time-in-america.webp',
		banner: '/banners/once-upon-a-time-in-america.webp',
		duration: 229,
		releaseDate: null,
		releaseYear: 1984,
		ratingAge: 18,
		country: 'США',
		category: 'classic'
	},
	{
		title: 'Побег из Шоушенка',
		slug: 'the-shawshank-redemption',
		description:
			'Банкир, несправедливо осуждённый, находит свободу — и надежду — в самых тёмных стенах. История о силе духа и долгом пути к свету.',
		poster: '/posters/the-shawshank-redemption.webp',
		banner: '/banners/the-shawshank-redemption.webp',
		duration: 142,
		releaseDate: null,
		releaseYear: 1994,
		ratingAge: 18,
		country: 'США',
		category: 'classic'
	},
	{
		title: 'Зелёная миля',
		slug: 'the-green-mile',
		description:
			'Тюрьма смертников, чудо посреди ужаса. История о сострадании, чудесах и боли, которую несут даже самые добрые сердца.',
		poster: '/posters/the-green-mile.webp',
		banner: '/banners/the-green-mile.webp',
		duration: 189,
		releaseDate: null,
		releaseYear: 1999,
		ratingAge: 12,
		country: 'США',
		category: 'classic'
	},
	{
		title: 'Апокалипсис сегодня',
		slug: 'apocalypse-now',
		description:
			'Путешествие в сердце войны во Вьетнаме, где грань между разумом и безумием стирается.',
		poster: '/posters/apocalypse-now.webp',
		banner: '/banners/apocalypse-now.webp',
		duration: 147,
		releaseDate: null,
		releaseYear: 1979,
		ratingAge: 18,
		country: 'США',
		category: 'classic'
	},
	{
		title: 'Славные парни',
		slug: 'goodfellas',
		description:
			'История о Генри Хилле — начинающем гангстере, занимающемся грабежами вместе с подельниками.',
		poster: '/posters/goodfellas.webp',
		banner: '/banners/goodfellas.webp',
		duration: 140,
		releaseDate: null,
		releaseYear: 1990,
		ratingAge: 18,
		country: 'США',
		category: 'classic'
	},
	{
		title: 'Формула-1',
		slug: 'f1',
		description:
			'В прошлом звезда «Формулы-1», Сонни Хейс возвращается в большой спорт спустя 30 лет, чтобы помочь команде-аутсайдеру и стать наставником молодого гонщика.',
		poster: '/posters/f1.webp',
		banner: '/banners/f1.webp',
		duration: 156,
		releaseDate: new Date('2026-06-03'),
		releaseYear: 2026,
		ratingAge: 12,
		country: 'США',
		category: null
	},
	{
		title: 'Оппенгеймер',
		slug: 'oppenheimer',
		description:
			'История жизни американского физика-теоретика Роберта Оппенгеймера, который во времена Второй мировой войны руководил Манхэттенским проектом — секретными разработками ядерного оружия.',
		poster: '/posters/oppenheimer.webp',
		banner: '/banners/oppenheimer.webp',
		duration: 181,
		releaseDate: new Date('2026-10-01'),
		releaseYear: 2023,
		ratingAge: 16,
		country: 'США',
		category: null
	},
	{
		title: 'Груз 200',
		slug: 'cargo-200',
		description:
			'Жесткий триллер о советской провинции середины 1980-х, об убийствах, насилии и распаде системы.',
		poster: '/posters/cargo-200.webp',
		banner: '/banners/cargo-200.webp',
		duration: 85,
		releaseDate: new Date('2026-12-31'),
		releaseYear: 2007,
		ratingAge: 18,
		country: 'Россия',
		category: 'balabanov'
	},
	{
		title: 'Солнцестояние',
		slug: 'midsommar',
		description:
			'Шведский культ. Летний фестиваль. Драма о группе друзей, которые попадают в загадочный мир древних ритуалов.',
		poster: '/posters/midsommar.webp',
		banner: '/banners/midsommar.webp',
		duration: 147,
		releaseDate: new Date('2026-10-31'),
		releaseYear: 2019,
		ratingAge: 18,
		country: 'США, Швеция',
		category: null
	},
	{
		title: 'Человек-паук: Через вселенные',
		slug: 'spider-man-into-the-spider-verse',
		description:
			'Мы всё знаем о Питере Паркере. Он спас город, влюбился, а потом спасал город снова и снова… Но все это – в нашем измерении. А что если в результате работы гигантского коллайдера откроется окно из одного измерения в другое? Найдется ли в нем свой Человек-паук? И как он будет выглядеть? Приготовьтесь к тому, что в разных вселенных могут быть разные Люди-пауки и однажды им придется собраться вместе для борьбы с почти непобедимым врагом.',
		poster: '/posters/spider-man-into-the-spider-verse.webp',
		banner: '/banners/spider-man-into-the-spider-verse.webp',
		duration: 117,
		releaseDate: new Date('2026-09-25'),
		releaseYear: 2018,
		ratingAge: 6,
		country: 'США',
		category: null
	},
	{
		title: 'Топ Ган: Мэверик',
		slug: 'top-gun-maverick',
		description:
			'Пит Митчелл по прозвищу Мэверик более 30 лет остаётся одним из лучших пилотов ВМФ. Бесстрашный лётчик-испытатель расширяет границы возможного и старательно избегает повышения в звании, которое заставило бы его приземлиться навсегда. Однако его нрав и готовность идти на риск не приветствуется командованием. После очередного инцидента Митчелла снова отправляют в «Топ Ган», но на этот раз в качестве учителя. Ему необходимо подготовить отряд выпускников «Топ Ган» для выполнения сложнейшей и смертельно опасной миссии. Среди кандидатов Мэверик встречает Брэдли Брэдшоу — сына своего погибшего друга и напарника Ника Брэдшоу по прозвищу Гусь.',
		poster: '/posters/top-gun-maverick.webp',
		banner: '/banners/top-gun-maverick.webp',
		duration: 131,
		releaseDate: new Date('2026-09-01'),
		releaseYear: 2022,
		ratingAge: 12,
		country: 'США',
		category: null
	},
	{
		title: 'Интерстеллар',
		slug: 'interstellar',
		description:
			'Путешествие сквозь червоточины и расстояния, где каждая секунда ценнее жизни.',
		poster: '/posters/interstellar.webp',
		banner: '/banners/interstellar.webp',
		duration: 169,
		releaseDate: new Date('2026-12-31'),
		releaseYear: 2014,
		ratingAge: 12,
		country: 'США',
		category: null
	},
	{
		title: 'Форд против Феррари',
		slug: 'ford-v-ferrari',
		description:
			'История противостояния двух автомобильных гигантов и гонки за победу в Ле-Мане.',
		poster: '/posters/ford-v-ferrari.webp',
		banner: '/banners/ford-v-ferrari.webp',
		duration: 152,
		releaseDate: null,
		releaseYear: 2019,
		ratingAge: 12,
		country: 'США',
		category: 'racing'
	},
	{
		title: 'Самый быстрый Indian',
		slug: 'the-worlds-fastest-indian',
		description:
			'История новозеландца Берта Манро, который установил мировой рекорд скорости на мотоцикле.',
		poster: '/posters/the-worlds-fastest-indian.webp',
		banner: '/banners/the-worlds-fastest-indian.webp',
		duration: 127,
		releaseDate: null,
		releaseYear: 2005,
		ratingAge: 12,
		country: 'США, Новая Зеландия',
		category: 'racing'
	},
	{
		title: 'Форсаж: Токийский дрифт',
		slug: 'fast-and-furious-tokyo-drift',
		description: 'Мир подпольных гонок, дрифта и уличной культуры Токио.',
		poster: '/posters/fast-and-furious-tokyo-drift.webp',
		banner: '/banners/fast-and-furious-tokyo-drift.webp',
		duration: 104,
		releaseDate: null,
		releaseYear: 2006,
		ratingAge: 12,
		country: 'США, Япония',
		category: 'racing'
	}
]

const pool = new Pool({
	host: process.env.DATABASE_HOST,
	port: Number(process.env.DATABASE_PORT),
	user: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME
})

async function main() {
	const client = await pool.connect()

	const db = drizzle(client)

	console.log('Seeding categories...')

	await db
		.insert(categories)
		.values([...CATEGORIES])
		.onConflictDoNothing()

	const dbCategories = await db.select().from(categories)

	const categoryMap = new Map(dbCategories.map(c => [c.slug, c.id]))

	console.log('Seeding movies...')

	await db
		.insert(movies)
		.values(
			MOVIES.map(movie => ({
				...movie,
				categoryId: movie.category
					? (categoryMap.get(movie.category) ?? null)
					: null
			}))
		)
		.onConflictDoNothing()

	console.log('Seed completed!')

	client.release()
	process.exit(0)
}

main()
