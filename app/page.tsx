import HomeContent from '../components/HomeContent';
import addShortenedUrl from '../Lib/addShortenedUrl';

export default async function HomePage({ searchParams }: { searchParams: any }) {
    let message = '';
    let shortLink = '';

    if (searchParams?.url) {
        try {
            const result = await addShortenedUrl({
                url: searchParams.url,
                alias: searchParams.alias,
            });

            console.log({
                searchParams,
                resultFromAddShortenedUrl: result,
                message,
                shortLink
            });

            if (typeof result === 'string' && result.startsWith('http')) {
                shortLink = result;
                message = "Shortened link created!";
            } else {
                message = result || "Error creating short link.";
            }
        } catch (err) {
            message = "Unexpected error! Try again.";
            console.log('Error in addShortenedUrl:', err);
        }
    }

    return (
        <main>
            <h1>Welcome to ShortLinker!</h1>
            <HomeContent message={message} shortLink={shortLink} />
        </main>
    );
}
