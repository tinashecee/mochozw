import { Pipe, PipeTransform } from '@angular/core';
import { VlogerCard } from './models/VlogerCardTrending';
@Pipe({
  name: 'sortPipe'
})
export class SortPipePipe implements PipeTransform {

  transform(videos: VlogerCard[], path: string[], order: number=1): VlogerCard[]{
    if (!videos || !path || !order) return videos;

    return videos.sort((a: VlogerCard, b: VlogerCard) => {
      // We go for each property followed by path
      path.forEach(property => {
        a = a[property];
        b = b[property];
      })

      // Order * (-1): We change our order
      return a > b ? order : order * (-1);
    })
  }

}
