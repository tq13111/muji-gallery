rm -rf build &&
yarn build &&
cd build &&
git init &&
git add . &&
git commit -m 'update' &&
git remote add origin git@github.com:tq13111/muji-gallery.git
git push -f origin master:gh-pages &&
cd ../ &&
echo https://tq13111.github.io/muji-gallery/index.html

