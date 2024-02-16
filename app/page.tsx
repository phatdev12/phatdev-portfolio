import { HomeComponent } from "@phatdev/client/HomeComponents";
import { clientEvent } from "@phatdev/Event";
import { serialize } from 'next-mdx-remote/serialize'
import { Markdown } from "@phatdev/Markdown";
import { MDXRemoteSerializeResult } from 'next-mdx-remote'


export default function Home() {
  clientEvent.emit('serial', {run: serialize});
  clientEvent.on('serial', async (data) => {
    
    clientEvent.emit('Component', await serialize(data));
  })
  
  return (<>
    <HomeComponent/>
  </>)
}

