import React from 'react'

import './style.css'
import { BACKEND_URL } from '../../config/config'
import { useNavigate } from 'react-router-dom'
import Image from '../SmallComponents/Image/Image'

interface PhotographerProps {
    photographer: {
        id: number;
        name: string;
        avatar?: string | null;
        email?: string | null;
        fb?: string | null;
      
    };
}

const Photographer: React.FC<PhotographerProps> = ({ photographer }) => {
    const navigate = useNavigate();
    
    return (
        <div className="photographer-block" onClick={() => navigate(`/photographer/${photographer.id}`)}>
            <div className="header">
                <Image url={BACKEND_URL + photographer?.avatar} className='avatar' alt={photographer?.name} />
                <div className="info">
                    <h5 className="name">{photographer?.name}</h5>
                    <h5>{photographer?.email}</h5>
                    {photographer?.fb && (
                        <h5>
                            <a href={photographer?.fb} target="_blank" rel="noopener noreferrer">
                                Facebook Profile
                            </a>
                        </h5>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Photographer;