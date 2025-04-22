@use '../../../../styles/mixins';

@include mixins.b('${kebabName}') {
  @include mixins.e('content') {
    color: mixins.css-variable('${kebabName}', 'color');
  }
}
