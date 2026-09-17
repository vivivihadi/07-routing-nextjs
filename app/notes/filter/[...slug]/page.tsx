import { fetchNotes } from '@/lib/api';
import { NoteTag } from '@/types/note';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';

type Props = {
    params: Promise<{ slug: string[] }>;
};

export default async function FilterNotesPage({ params }: Props) {
    const { slug } = await params;
    const tag = slug[0] === 'all' ? undefined : (slug[0] as NoteTag);

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["notes", "", 1, tag],
        queryFn: () => fetchNotes("", 1, 12, tag),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={tag}/>
        </HydrationBoundary>
    );
}