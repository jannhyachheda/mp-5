import Link from 'next/link';

function NavBar() {
    return (
        <header style={{ padding: '1rem', background: '#f4f4f4' }}>
            <Link href="/">
                <span style={{ fontWeight: 700, fontSize: '2rem', color: '#2563eb' }}>
                    ShortLinker CS391 Project
                </span>
            </Link>
        </header>
    );
}

export default NavBar;