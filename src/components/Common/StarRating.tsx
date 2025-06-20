import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showNumber = true,
  interactive = false,
  onRatingChange
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const handleStarClick = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      <div className="flex">
        {[...Array(maxRating)].map((_, index) => {
          const starRating = index + 1;
          const isFilled = starRating <= rating;
          
          return (
            <Star
              key={index}
              className={`${sizeClasses[size]} ${
                isFilled ? 'text-yellow-400 fill-current' : 'text-gray-300'
              } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
              onClick={() => handleStarClick(starRating)}
            />
          );
        })}
      </div>
      {showNumber && (
        <span className="text-sm text-gray-600 ml-2">
          {rating.toFixed(1)} / {maxRating}
        </span>
      )}
    </div>
  );
};

export default StarRating;