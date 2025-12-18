import { BaseService } from '../BaseService';
import type { LocalOptionType } from '../../config';

export default class ReadDirectionService extends BaseService {
  constructor(options: LocalOptionType) {
    super(options);
  }
}
