import { useEffect } from 'react';

const useTitle = title => {
   useEffect(()=>{
    document.title =`${title} - Flip Mobile`
   }
    ,[title])
};

export default useTitle;