import { withInstall, withNoopInstall } from '@aurora/utils';
import { default as Carousel } from './src/Carousel';
import { default as CarouselItem } from './src/CarouselItem';

export type {
  CarouselProps,
  CarouselItemProps,
  HCarouselArrow,
  HCarouselDirection,
  HCarouselEffect,
  HCarouselIndicatorPosition,
  HCarouselIndicatorType,
  HCarouselTarget,
  HCarouselTrigger,
} from './src/composables/useProps';

export const HCarousel = withInstall(Carousel, { CarouselItem });
export const HCarouselItem = withNoopInstall(CarouselItem);
export default HCarousel;
