export const debounce = ({ a, b, c }) => {
  let d, e;
  return function () {
    function h() {
      d = null;
      c || (e = a.apply(f, g));
    }
    let f = this,
      g = arguments;
    return (
      clearTimeout(d), (d = setTimeout(a, b)), c && !d && (e = a.apply(f, g)), e
    );
  };
};

export function removeHTMLTags({ str }) {
  return str.replace(/<[^>]*>?/gm, "");
}
