import React, { useState, useEffect } from 'react';
import { UploadIcon, InstagramIcon } from './icons';

interface WorkoutPhotoUploaderProps {
  photoUrl: string | null;
  onPhotoSelect: (file: File) => void;
}

const WorkoutPhotoUploader: React.FC<WorkoutPhotoUploaderProps> = ({ photoUrl, onPhotoSelect }) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    setPreview(photoUrl);
  }, [photoUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onPhotoSelect(file);
    }
  };
  
  const handleShare = () => {
    window.open('https://www.instagram.com', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl">
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">📸 Registre Seu Momento</h3>
      <div className="space-y-4">
        {!preview ? (
          <label className="flex justify-center w-full h-32 px-4 transition bg-white dark:bg-slate-700/50 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-md appearance-none cursor-pointer hover:border-rose-400 dark:hover:border-rose-500 focus:outline-none">
            <span className="flex items-center space-x-2">
              <UploadIcon className="w-6 h-6 text-slate-600 dark:text-slate-300" />
              <span className="font-medium text-slate-600 dark:text-slate-300">
                Clique para adicionar uma foto
              </span>
            </span>
            <input type="file" name="file_upload" className="hidden" accept="image/*" onChange={handleFileChange} />
          </label>
        ) : (
          <div>
            <img src={preview} alt="Prévia do treino" className="w-full max-h-80 object-cover rounded-lg shadow-md" />
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <label className="flex-1 w-full sm:w-auto">
                 <span className="cursor-pointer w-full text-center px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-600 rounded-full hover:bg-slate-300 dark:hover:bg-slate-500 block">
                  Trocar Foto
                 </span>
                <input type="file" name="file_upload" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
              <button
                onClick={handleShare}
                className="flex-1 w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full hover:opacity-90"
              >
                <InstagramIcon className="w-5 h-5" />
                Postar no Instagram
              </button>
            </div>
             <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center sm:text-left">
                Você será direcionado para o Instagram para criar sua postagem.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutPhotoUploader;