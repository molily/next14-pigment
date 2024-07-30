import React from 'react';
import { css, styled } from '@pigment-css/react';

import type { CSSProperties } from '@pigment-css/react';
import type { InputHTMLAttributes, ReactElement } from 'react';

// css``
// -----

// Generates a class
const vStack = css`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

// equivalent object notation
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const vStackObject = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5em'
});

// styled
// ------

// Styled component with template literal
const Button = styled.button`
  color: red;
`;

// Passing the element name as string
const ButtonElementString = styled('button')`
  color: red;
`;

// Object notation
const ButtonObject = styled.button({
  color: 'red'
});

// equivalent
// Passing a function that returns an object
const ButtonCallback = styled.button(
  (): CSSProperties => ({
    color: 'red'
  })
);

// The purpose of this is to access the theme.
// The theme is passed in the next config.
const ButtonTheme = styled.button(
  ({ theme }): CSSProperties => ({
    color: theme.fgcolor
  })
);

// Reusable CSS declarations
// -------------------------

// This needs to be a string or object, not css``

const borderString = `
  border: 1px solid red;
`;

// Declare an object with styles that can be reused
const borderRadiusObject: CSSProperties = {
  borderRadius: '5px'
};

// Use CSS declarations
// --------------------

// Compose component with interpolation
// Interpolating objects and strings into a template literal does not work
// Interpolating functions that return strings works

// Works but raises a TypeScript error when creating an instance (see below)
const ButtonWithInterpolation = styled.button`
  ${(): CSSProperties => borderRadiusObject}
  ${({ theme }): CSSProperties => ({ color: theme.color })}
  color: red;
`;

// Directly string interpolation does not work, but a function that returns a string
const ButtonWithStringInterpolation = styled.button`
  ${(): string => borderString}
  color: red;
`;

// Mixed interpolation: Works, but raises a TypeScript error
const ButtonWithMixedInterpolation = styled.button`
  ${(): CSSProperties => borderRadiusObject}
  ${(): string => borderString}
  color: red;
`;

// Compose component with interpolation
const ButtonWithObjectComposition = styled.button(
  // Passing strings here does not work
  borderRadiusObject,
  ({ theme }): CSSProperties => ({ color: theme.color }),
  { color: 'red' }
);

// Dynamic props
// -------------

// Compiles to inline styles with Custom Properties
// Compiles to
// <button class="dynamicButton" style="--color: 1.23rem">
// and
// .dynamicButton { color: var(--color); }
// (naming is different of course)
// This needs to be an object!
const ButtonDynamic = styled.button<{ color?: string; size?: 'normal' | 'large' }>({
  color: ({ color }): string | undefined => color ?? undefined,
  fontSize: ({ size }): string | undefined =>
    (size === 'large' ? '1.2em' : undefined)
});

// Template literal with props does not work
// const ButtonDynamicString = styled.button<{ color?: string; size?: 'normal' | 'large' }>`
//   color: ${({ color }): string | undefined => color ?? undefined};
//   font-size: ${({ size }): string | undefined =>
//    (size === 'large' ? '1.2em' : undefined)};
// `;

// Derived components
// ------------------

// Derive component from other component
const DerivedButton = styled(Button)`
  padding: 1em;
`;

// Unstyled React component that accepts class name and inline style
const TextInput = ({ className, style, ...rest }: InputHTMLAttributes<HTMLInputElement>): ReactElement => (
  <input type='text' className={ className } style={ style } { ...rest } />
);

const input = <input type="text" />;

// Add styling to existing component
const StyledTextInput = styled(TextInput)`
  color: red;
`;

// Needs to be an object, not a template literal
const StyledTextInputAdditionalProps = styled(StyledTextInput)<{ size?: 'normal' | 'large' }>({
  fontSize: ({ size }): string =>
    (size === 'large' ? '1.2em' : '1em')
});

// Variants
// --------

// Variants compile to classes, classes are combined
interface ButtonVariantsProps {
  buttonType: 'primary' | 'secondary';
  size?: 'small' | 'large';
}
const ButtonVariants = styled.button<ButtonVariantsProps>({
  border: '1px solid navy',

  variants: [
    {
      props: { buttonType: 'primary' },
      style: { backgroundColor: 'powderblue' }
    },
    {
      props: { buttonType: 'secondary' },
      style: {
        color: 'white',
        backgroundColor: 'plum',
        textShadow: '0 0.5px 2px black'
      }
    },
    {
      props: { size: 'small' },
      style: { padding: '0.5rem' }
    },
    {
      props: { size: 'large' },
      style: { padding: '1rem' }
    }
  ]
});

const PigmentOverview = (): ReactElement => (
  <div className={ vStack }>
    <h1>PigmentOverview</h1>

    <Button>Button</Button>
    <ButtonElementString>ButtonElementString</ButtonElementString>
    <ButtonObject>ButtonObject</ButtonObject>
    <ButtonCallback>ButtonCallback</ButtonCallback>
    <ButtonTheme>ButtonTheme</ButtonTheme>

    <ButtonWithInterpolation>ButtonWithInterpolation</ButtonWithInterpolation>
    <ButtonWithStringInterpolation>ButtonWithStringInterpolation</ButtonWithStringInterpolation>
    <ButtonWithMixedInterpolation>ButtonWithMixedInterpolation</ButtonWithMixedInterpolation>
    <ButtonWithObjectComposition>ButtonWithObjectComposition</ButtonWithObjectComposition>

    <ButtonDynamic>ButtonDynamic</ButtonDynamic>
    <ButtonDynamic color='red'>ButtonDynamic color=red</ButtonDynamic>
    <ButtonDynamic color='red' size='large'>ButtonDynamic color=red size=large</ButtonDynamic>

    <DerivedButton>DerivedButton</DerivedButton>

    <TextInput placeholder='TextInput' defaultValue='TextInput' />
    <StyledTextInput placeholder='StyledTextInput' defaultValue='StyledTextInput' />
    <StyledTextInputAdditionalProps placeholder='StyledTextInputAdditionalProps' defaultValue='StyledTextInputAdditionalProps' size='large' />

    <ButtonVariants buttonType='primary'>
      ButtonVariants primary
    </ButtonVariants>
    <ButtonVariants buttonType='primary' size='small'>
      ButtonVariants primary+small
    </ButtonVariants>
    <ButtonVariants buttonType='primary' size='large'>
      ButtonVariants primary+large
    </ButtonVariants>
    <ButtonVariants buttonType='secondary'>secondary</ButtonVariants>
    <ButtonVariants buttonType='secondary' size='small'>
      ButtonVariants secondary+small
    </ButtonVariants>
    <ButtonVariants buttonType='secondary' size='large'>
      ButtonVariants secondary+large
    </ButtonVariants>
  </div>
);

export { PigmentOverview };
