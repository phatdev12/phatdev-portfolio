import { HomeComponent } from "@phatdev/client/HomeComponents";
import { clientEvent } from "@phatdev/Event";
import { serialize } from 'next-mdx-remote/serialize'
import { Markdown } from "@phatdev/Markdown";
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { System } from "@phatdev/System";

function mdresolve(data: string) {
  const pair = new Array(2);

  for(let i = 0; i<=data.length-1; i++) {
    var cache = "";
    if(data[i] == ">" && data[i-1] == "-") {
      var j = i;
      for(j; j>=0 && cache.endsWith("!<") == false; j--) {
        if(cache.startsWith(">-")) pair[1] = i;
        cache+=data[j];
      }
        if(cache.endsWith("!<")) {
            pair[0] = j;
        } else {
            continue;
        }
        data = data.substring(0, pair[0])+data.substring(pair[1]+1);
        pair[0] = pair[1] = 0;
        i = data.length-i-1;
    }
  }

  return data
}

export default async function Home() {
  const res = await fetch(`https://${System.api.github}/repos/${System.owner}/${System.repo}/contents/README.md`);

  const data = res.json();
  const md = await mdresolve(Buffer.from((await data).content, 'base64').toString('utf-8'));
  
  const content = await serialize(md);

  return (<div id="smooth-wrapper">
    <HomeComponent/>
    <div style={{
      padding: 15,
      display: 'flex',
      justifyContent: 'center'
    }} id="smooth-content">
      <div>
        <Markdown content={content}/>
      </div>
    </div>
    
  </div>)
}

