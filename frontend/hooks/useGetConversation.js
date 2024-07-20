import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const backendapi = import.meta.env.VITE_BACKEND_URL;

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${backendapi}/api/users'`);
        const data = await res.json();
        console.log('API Response:', data); // Log the API response
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        console.error('Error fetching conversations:', error); // Log any errors
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};
export default useGetConversations;
