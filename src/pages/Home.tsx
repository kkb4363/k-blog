import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { categories, posts } from "utils/staticDatas";
import { useDisplayStore } from "stores/display.store";
import HomeLayout from "components/HomeLayout";

export default function Home() {
  const { setTag, setCategory } = useDisplayStore();

  useEffect(() => {
    const newTag = [];
    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        const existingTag = newTag.find((p) => p.id === tag);
        if (!existingTag) {
          newTag.push({
            id: tag,
            title: tag,
            posts: [post],
          });
        } else {
          existingTag.posts.push(post);
        }
      });
    });

    setTag(newTag);
  }, []);

  useEffect(() => {
    const newcategory = [];
    categories.forEach((cate) => {
      if (!newcategory.some((d) => d.id === cate.id)) {
        newcategory.push({
          id: cate.id,
          posts: [],
          title: cate.title,
          updatedDate: cate.updatedDate,
        });
      }
      posts.forEach((post) => {
        if (post.categoryId === cate.id) {
          const prevCategory = newcategory.find(
            (d) => d.id === post.categoryId
          );
          if (prevCategory) {
            prevCategory.posts.push(post);
          }
        }
      });
    });

    setCategory(newcategory);
  }, []);

  return (
    <HomeLayout>
      <Outlet />
    </HomeLayout>
  );
}
