const ampScript = '<script async src="https://cdn.ampproject.org/v0.js"></script>'
const ampBoilerplate = '<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>'

module.exports = (html) => {
    // Add ⚡ to html tag
    html = html.replace(/<html/gi, '<html ⚡')
  
    // Combine css into single tag
    // let styleConcat = ''
    // html = html.replace(/<style[^>]*data-vue-ssr[^>]*>(.*?)?<\/style>/gi, (match, sub) => {
    //   styleConcat += sub
    //   return ''
    // })
    // html = html.replace('</head>', `<style amp-custom>${styleConcat}</style></head>`)

    // Add amp-custom tag to added CSS
    // html = html.replace(/<style data-vue-ssr/g, '<style amp-custom data-vue-ssr')

    // Add amp-custom tag to added CSS
    html = html.replace(/<style data-vue-ssr-id\W[^>]*/g, '<style amp-custom');
    html = html.replace(/<\/style><style amp-custom>/gi, '');
    
    // Remove data attributes from tags
    // html = html.replace(/\s*data-(?:[^=>]*="[^"]*"|[^=>\s]*)/gi, '')
  
    // Remove JS script tags except for ld+json
    html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, (match) => {
      return (/application\/ld\+json/gi.test(match)) ? match : ''
    })
  
    // Add AMP script before </head>
    html = html.replace('</head>', ampScript + ampBoilerplate + '</head>')
  
    return html
  }