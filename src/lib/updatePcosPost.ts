import { updateDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const updatePcosPostImage = async () => {
  try {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, where('slug', '==', 'understanding-pcos-symptoms-diagnosis-treatment'));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const postDoc = querySnapshot.docs[0];
      await updateDoc(postDoc.ref, {
        image_url: '/lovable-uploads/231d5559-8036-425f-8826-c946487553e3.png'
      });
      console.log('PCOS post image updated successfully');
    } else {
      console.error('Post not found');
    }
  } catch (error) {
    console.error('Error updating PCOS post image:', error);
  }
};
