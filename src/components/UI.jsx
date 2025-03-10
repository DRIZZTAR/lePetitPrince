import { atom, useAtom } from 'jotai';
import { pictures } from './bookData.js';
import { useEffect, useState } from 'react';
import ScrollingText from './ScrollingText.jsx';

export const pageAtom = atom(0);
// Function to determine if a page should be a web page
const isWebPage = index => {
	// Example: Make every 5th page a web page
	return index % 5 === 0 && index !== 0 && index !== pictures.length - 1;
};

// Function to get web URL for a page
const getWebUrl = index => {
	// Example: Rotate through a set of URLs
	const urls = ['https://www.tysonskakun.dev'];
	return urls[index % urls.length];
};

export const pages = [
	{
		front: 'cover',
		back: pictures[0],
	},
];

for (let i = 1; i < pictures.length - 1; i += 2) {
	pages.push({
		front: pictures[i % pictures.length],
		back: pictures[(i + 1) % pictures.length],
		isWebPage: isWebPage(i),
		webUrl: isWebPage(i) ? getWebUrl(i) : undefined,
	});
}

pages.push({
	front: pictures[pictures.length - 1],
	back: 'back',
});

export const UI = ({ toggleEnvironment, showEnvironment }) => {
	const [page, setPage] = useAtom(pageAtom);
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const closeMenu = () => {
		setMenuOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = event => {
			if (
				menuOpen &&
				!event.target.closest('.menu') &&
				!event.target.closest('.hamburger')
			) {
				closeMenu();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [menuOpen]);

	useEffect(() => {
		const audio = new Audio('/audios/page-flip-01a.mp3');
		audio.volume = 0.1;
		audio.play();
	}, [page]);

	return (
		<>
			<main className='pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col'>
				<div className='p-4 pointer-events-auto text-slate-800'>
					<h1 className='text-4xl font-thin tracking-wide mb-2'>
						Le Petit Prince
					</h1>
					<p className='text-xl font-medium text-slate-600 mb-1'>
						Antoine de Saint-Exupéry
					</p>
					<p className='text-lg font-light italic text-slate-500'>
						April 6, 1943
					</p>
				</div>
				<div className='w-full font-inter overflow-auto pointer-events-auto flex justify-center'>
					<div className='overflow-auto flex items-center gap-4 max-w-full p-5'>
						{[...pages].map((_, index) => (
							<button
								key={index}
								className={`border-transparent hover:border-white transition-all duration-300 px-4 py-2 rounded-full text-lg uppercase shrink-0 border ${
									index === page
										? 'bg-white/90 text-black'
										: 'bg-black/30 text-white'
								}`}
								onClick={() => setPage(index)}
							>
								{index === 0 ? 'Cover' : `Page ${index}`}
							</button>
						))}
						<button
							className={`border-transparent font-inter hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
								page === pages.length
									? 'bg-white/90 text-black'
									: 'bg-black/30 text-white'
							}`}
							onClick={() => setPage(pages.length)}
						>
							Back Cover
						</button>
					</div>
				</div>
			</main>

			{/* <ScrollingText /> */}
			<div
				className={`hamburger ${menuOpen ? 'active' : ''}`}
				onClick={toggleMenu}
			>
				<div />
				<div />
				<div />
			</div>
			<div className={`menu ${menuOpen ? 'active' : ''}`}>
				<div className='menu-close' onClick={closeMenu}></div>
				<div className='menu-content p-10'>
										<div className='menu-item'>
						<a
							href='https://vogue-silk.vercel.app/'
							target='_blank'
							rel='noopener noreferrer'
						>
							Vogue, 2021
						</a>
					</div>
					<div className='menu-item'>
						<a
							href='https://dragon-ball-three.vercel.app/'
							target='_blank'
							rel='noopener noreferrer'
						>
							DragonBall
						</a>
					</div>
					<div className='menu-item'>
						<a
							href='https://link-to-the-past.vercel.app/'
							target='_blank'
							rel='noopener noreferrer'
						>
							Link to The Past Manual
						</a>
					</div>
					<div className='menu-item'>
						<a
							href='https://batman-omega.vercel.app/'
							target='_blank'
							rel='noopener noreferrer'
						>
							Batman Issue #01
						</a>
					</div>
					<div className='menu-item font-bold'>
						<a
							href='https://nintendo-power-pokemon.vercel.app/'
							target='_blank'
							rel='noopener noreferrer'
						>
							Nintendo Power
						</a>
					</div>
					<div className='menu-item font-extrabold'>
						<div className='group'>
							<a
								href='https://www.TysonSkakun.dev/'
								target='_blank'
								rel='noopener noreferrer'
							>
								Personal Site
							</a>
						</div>
						</div>
					</div>
				</div>
		</>
	);
};
