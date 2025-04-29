// Объявление для CSS-модулей
declare module '*.module.css' {
	const classes: { readonly [key: string]: string };
	export default classes;
}
