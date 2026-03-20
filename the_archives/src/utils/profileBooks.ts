import { getCurrentUserId, getUserProfileBooks } from "../firebase/firestoreFunctions";

export async function getBookInfo(){
  const userId = getCurrentUserId()
  if (!userId) return { finishedBooks: [], toReadBooks: [] };

  const profileBooks = await getUserProfileBooks(userId);
  const bookIds = profileBooks.map(book => Number(book.book_id));
  if (bookIds.length === 0) return { finishedBooks: [], toReadBooks: [] };

  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books/batch`, {
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bookIds }),
  })

  if (!response.ok) return { finishedBooks: [], toReadBooks: [] };

  const { books } = await response.json();

  // @ts-ignore
  const mergedBooks = books.map(book => ({
    ...book, ...profileBooks.find(pb => Number(pb.book_id) === book.book_id)
  }))

  return {
    // @ts-ignore
    finishedBooks: mergedBooks.filter(book => book.status === 'finished'),
    // @ts-ignore
    toReadBooks: mergedBooks.filter(book => book.status === 'to_read'),
  }
}