
import fs from 'fs'

export async function getStaticPaths() {
    try {
        const files = fs.readdirSync('public/posts');
        const paths = files.map((fileName) => ({
          params: {
            slug: fileName.replace('.md', '')
          }
        }));
    
        return {
          paths,
          fallback: "blocking"
        };
      } catch (error) {
        console.error(error);
    
        return {
          paths: [],
          fallback: false
        };
      }
}

export async function getStaticProps({ params: { post } }) {
    try {
        const fileName = fs.readFileSync(`public/blog/${post}.md`, 'utf-8');

    } catch (error) {
        console.error(error);
    }

}


export default function Page({ params }) {
  return <div>My Post: {params.post}</div>
}
