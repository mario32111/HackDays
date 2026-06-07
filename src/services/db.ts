import { db } from '@/config/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  getDocs, 
  serverTimestamp,
} from 'firebase/firestore';

// ========================
// INTERFACES (Tipos de datos)
// ========================

export interface UserData {
  displayName: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email: string | null;
  photoUrl: string | null;
  role?: 'user' | 'seller';
  businessInfoRegistered?: boolean;
  businessName?: string;
  businessCategory?: string;
  businessAddress?: string;
  businessKeywords?: string;
  businessBio?: string;
  interestsRegistered?: boolean;
  interests?: string[];
  createdAt: any;
}

export interface MovieData {
  title: string;
  year: number;
  summary?: string;
  genres?: string[];
  runtime?: number;
  createdAt: any;
}

export interface WatchData {
  movieId: string;
  watchDate: any;
  location?: string;
  createdAt: any;
}

export interface ReviewData {
  rating: number;
  reviewText?: string;
  isPublic: boolean;
  watchId?: string;
  userId: string;
  userDisplayName: string;
  userPhotoUrl?: string | null;
  createdAt: any;
  updatedAt: any;
}

export interface ListData {
  name: string;
  description?: string;
  isPublic: boolean;
  createdAt: any;
  updatedAt: any;
}

export interface ListItemData {
  movieId: string;
  position: number;
  note?: string;
  addedAt: any;
}

// ========================
// FUNCIONES DE USUARIO
// ========================

// Crea el perfil del usuario en Firestore después de registrarse
export const createUserProfile = async (
  authId: string, 
  email: string | null, 
  firstName: string, 
  lastName: string, 
  phone: string
) => {
  const userRef = doc(db, 'users', authId);
  const userSnap = await getDoc(userRef);

  // Solo lo creamos si no existe previamente
  if (!userSnap.exists()) {
    const newUser: UserData = {
      displayName: `${firstName} ${lastName}`.trim(),
      firstName,
      lastName,
      phone,
      email,
      photoUrl: null,
      businessInfoRegistered: false,
      interestsRegistered: false,
      createdAt: serverTimestamp(),
    };
    await setDoc(userRef, newUser);
  }
};

// Actualiza el rol del usuario (Cliente o Negocio)
export const updateUserRole = async (authId: string, role: 'user' | 'seller') => {
  const userRef = doc(db, 'users', authId);
  await updateDoc(userRef, { role });
};

// Marca que el usuario ya completó sus intereses y guarda la selección
export const updateUserInterests = async (authId: string, interests: string[]) => {
  const userRef = doc(db, 'users', authId);
  await updateDoc(userRef, { 
    interestsRegistered: true,
    interests: interests
  });
};

// Guarda la información básica del negocio
export const updateBusinessBasicInfo = async (
  authId: string, 
  data: { businessName: string; businessCategory: string; businessAddress: string }
) => {
  const userRef = doc(db, 'users', authId);
  await updateDoc(userRef, data);
};

// Guarda la bio del negocio y marca el registro como completado
export const updateBusinessBio = async (
  authId: string,
  data: { businessKeywords: string; businessBio: string }
) => {
  const userRef = doc(db, 'users', authId);
  await updateDoc(userRef, {
    ...data,
    businessInfoRegistered: true
  });
};

// ========================
// FUNCIONES DE PELÍCULAS
// ========================

// Agrega una nueva película al catálogo general
export const createMovie = async (movie: Omit<MovieData, 'createdAt'>) => {
  const moviesRef = collection(db, 'movies');
  return await addDoc(moviesRef, {
    ...movie,
    createdAt: serverTimestamp(),
  });
};

// Agrega o actualiza la reseña de un usuario sobre una película
export const addMovieReview = async (
  movieId: string, 
  userId: string, 
  review: Omit<ReviewData, 'createdAt' | 'updatedAt' | 'userId'>
) => {
  // El ID del documento será el userId para asegurar máximo 1 reseña por usuario en esta peli
  const reviewRef = doc(db, 'movies', movieId, 'reviews', userId);
  await setDoc(reviewRef, {
    ...review,
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

// ========================
// FUNCIONES DE LISTAS Y VISTAS (Anidadas al Usuario)
// ========================

// Registra que el usuario vio una película
export const addWatchHistory = async (userId: string, watch: Omit<WatchData, 'createdAt'>) => {
  const watchesRef = collection(db, 'users', userId, 'watches');
  return await addDoc(watchesRef, {
    ...watch,
    createdAt: serverTimestamp(),
  });
};

// Crea una nueva lista personalizada para el usuario
export const createCustomList = async (userId: string, list: Omit<ListData, 'createdAt' | 'updatedAt'>) => {
  const listsRef = collection(db, 'users', userId, 'lists');
  return await addDoc(listsRef, {
    ...list,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

// Agrega una película a una lista específica del usuario
export const addMovieToList = async (
  userId: string, 
  listId: string, 
  movieId: string, 
  itemData: Omit<ListItemData, 'movieId' | 'addedAt'>
) => {
  // Usamos el movieId como el ID del documento en la lista para evitar duplicados fácilmente
  const listItemRef = doc(db, 'users', userId, 'lists', listId, 'items', movieId);
  await setDoc(listItemRef, {
    ...itemData,
    movieId,
    addedAt: serverTimestamp(),
  });
};
