import { BaseService } from '../BaseService';
import type {
  LocaleLangDictionary,
  LocaleLangMethod,
  LocaleReturnLangDictionary,
  LocalOptionType,
  PartialLocaleLangFileType,
  LocaleSupportLangV2,
} from '../../config';

export default class LangService extends BaseService {
  public dictionaries: PartialLocaleLangFileType;

  public t: LocaleLangMethod;

  public td!: LocaleReturnLangDictionary;

  constructor(options: LocalOptionType) {
    super(options);

    if (!options.lang) {
      throw new Error('You must set options.lang to provide dictionaries');
    }

    const { t, dictionaries } = options.lang;

    this.dictionaries = dictionaries;
    this.t = t || this.defaultTranslator.bind(this);
    this.td = () => {
      if (!this.dictionaries[this.current]) {
        throw new Error(`You haven't set ${this.current} dictionary in options.lang.dictionaries`);
      }
      return this.dictionaries[this.current]!;
    };
  }

  public defaultTranslator(path: string, language?: LocaleSupportLangV2): string {
    let currDictionary: LocaleLangDictionary = this.dictionaries[language || this.current]!;
    let res = '';

    path.split('.').forEach(key => {
      if (typeof currDictionary[key] === 'object') {
        currDictionary = currDictionary[key] as LocaleLangDictionary;
      } else {
        res = currDictionary[key] as string;
      }
    });

    return res;
  }
}
