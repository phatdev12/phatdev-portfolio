use getrandom::getrandom;
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::JsFuture;
use web_sys::{Request, RequestInit, RequestMode, Response};

#[wasm_bindgen]
pub extern "C" fn generate_random_string(length: usize) -> String {
    let mut rand_string = String::with_capacity(length);

    let mut bytes = [0u8; 1];
    for _ in 0..length {
        getrandom(&mut bytes).expect("Error generating random byte");

        let rand_char = match bytes[0] % 62 {
            n @ 0..=25 => char::from(u8::from(b'a') + n),
            n @ 26..=51 => char::from(u8::from(b'A') + (n - 26)),
            n @ 52..=61 => char::from(u8::from(b'0') + (n - 52)),
            _ => unreachable!(),
        };

        rand_string.push(rand_char);
    }

    rand_string
}

#[wasm_bindgen]
pub extern "C" fn mdresolve(data: &str) -> String {
    let mut pair: [usize; 2] = [0, 0];
    let mut data = data.to_string();

    let mut i = 0;

    while i < data.len() {
        let mut cache = String::new();
        if data.chars().nth(i) == Some('>') && data.chars().nth(i - 1) == Some('-') {
            let mut j = i;

            while j > 0 && !cache.ends_with("!<") {
                if cache.starts_with(">-") {
                    pair[1] = i;
                }

                if let Some(ch) = data.chars().nth(j) {
                    cache.push(ch);
                }

                j -= 1;
            }

            if cache.ends_with("!<") {
                pair[0] = j;
            } else {
                continue;
            }

            data = format!("{}{}", &data[..pair[0]], &data[pair[1] + 1..]);
            pair[0] = 0;
            pair[1] = 0;
            i = data.len()-i-1;
        }
        i+=1;
    }

    data
}


#[wasm_bindgen]
pub async fn jsonRequest(host: String, endpoint: String, ssl: bool) -> Result<JsValue, JsValue> {
    let mut opts = RequestInit::new();
    opts.method("GET");
    opts.mode(RequestMode::Cors);

    let mut url: String;

    if ssl {
        url = (&"https://").to_string();
    } else {
        url = (&"http://").to_string();
    }

    url = url + &host +& endpoint;

    let request = Request::new_with_str_and_init(&url, &opts)?;

    let window = web_sys::window().unwrap();
    let resp_value = JsFuture::from(window.fetch_with_request(&request)).await?;

    assert!(resp_value.is_instance_of::<Response>());
    let resp: Response = resp_value.dyn_into().unwrap();
    let json = JsFuture::from(resp.json()?).await?;

    Ok(json)
}

#[wasm_bindgen]
pub async fn textRequest(host: String, endpoint: String, ssl: bool) -> Result<JsValue, JsValue> {
    let mut opts = RequestInit::new();
    opts.method("GET");
    opts.mode(RequestMode::Cors);

    let mut url: String;

    if ssl {
        url = (&"https://").to_string();
    } else {
        url = (&"http://").to_string();
    }

    url = url + &host +& endpoint;

    let request = Request::new_with_str_and_init(&url, &opts)?;

    let window = web_sys::window().unwrap();
    let resp_value = JsFuture::from(window.fetch_with_request(&request)).await?;

    assert!(resp_value.is_instance_of::<Response>());
    let resp: Response = resp_value.dyn_into().unwrap();
    let text = JsFuture::from(resp.text()?).await?;

    Ok(text)
}