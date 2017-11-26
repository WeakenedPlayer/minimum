const nexe = require('nexe');
const pkg = require('./package.json');

nexe.compile( {
		input: './dist/main.bundle.js',
		output: 'release/NS-ScreenshotBot-' + pkg.version + '.exe',
		loglevel: 'verbose',
		build: true,
		ico: 'resource/icon.ico'
} );
// nexe のバンドル機能は、含めたファイルをカレントディレクトリに展開するので、
// コマンドプロンプトから実行すると、実行した場所それぞれにファイルが展開されてしまうことが判明。
// 好ましくない動作のため、改善されるまで使用しない。
// 代わりに、require( 'sharp/build/release/****.dll' ); を使って、webpack からファイルコピーを行う。
//		native: {
//			// modules
//			sharp: {
//				// required files
//				additionalFiles: [
//					// relative to: node_modules/sharp/lib/index.js
//					// node_modules/nexe/lib/bundling/embed-node.js によると、sharp を require すると、以下のファイルがパッケージに含まれる模様。
//					'../release/sharp.node',
//					'../release/GNU.Gettext.dll',
//					'../release/libasprintf-0.dll',
//					'../release/libcairo-2.dll',
//					'../release/libcairo-gobject-2.dll',
//					'../release/libcairo-script-interpreter-2.dll',
//					'../release/libcharset-1.dll',
//					'../release/libcroco-0.6-3.dll',
//					'../release/libexif-12.dll',
//					'../release/libexpat-1.dll',
//					'../release/libffi-6.dll',
//					'../release/libfftw3-3.dll',
//					'../release/libfontconfig-1.dll',
//					'../release/libfreetype-6.dll',
//					'../release/libgcc_s_seh-1.dll',
//					'../release/libgdk_pixbuf-2.0-0.dll',
//					'../release/libgif-7.dll',
//					'../release/libgio-2.0-0.dll',
//					'../release/libglib-2.0-0.dll',
//					'../release/libgmodule-2.0-0.dll',
//					'../release/libgobject-2.0-0.dll',
//					'../release/libgsf-1-114.dll',
//					'../release/libgthread-2.0-0.dll',
//					'../release/libiconv-2.dll',
//					'../release/libintl-8.dll',
//					'../release/libjpeg-62.dll',
//					'../release/liblcms2-2.dll',
//					'../release/libpango-1.0-0.dll',
//					'../release/libpangocairo-1.0-0.dll',
//					'../release/libpangowin32-1.0-0.dll',
//					'../release/libpixman-1-0.dll',
//					'../release/libpng16-16.dll',
//					'../release/libquadmath-0.dll',
//					'../release/librsvg-2-2.dll',
//					'../release/libssp-0.dll',
//					'../release/libstdc++-6.dll',
//					'../release/libtiff-5.dll',
//					'../release/libvips-42.dll',
//					'../release/libvips-cpp.dll',
//					'../release/libwebp-7.dll',
//					'../release/libxml2-2.dll',
//					'../release/zlib1.dll'
//				]
//			}
//		}