import { useGetFileData } from '@/hooks/api/misc/useGetFileData';
import { useEffect } from 'react';

interface Props extends React.HTMLAttributes<HTMLImageElement> {
    id: string;
    alt?: string;
}

const Image = (props: Props) => {        
    const { getFileData , data, isLoading , error }: {
      data: any | null,
      getFileData: (fileId: string) => void,
      isLoading: boolean,
      error: string | null,
    } = useGetFileData();

    useEffect(() => {
        getFileData(props.id);
    }, [props.id]);

  return (
    <>
    {isLoading && <div className="text-center my-5">Loading...</div>}
    {error && <div className="text-center my-5">Error fetching image</div>}
    {data && data.fileUrl && (
      <img
        {...props}
        src={data.fileUrl}
        alt={props.alt ?? props.id}
        className={props.className}
      />
    )}
    </>
  );
};

export default Image;

