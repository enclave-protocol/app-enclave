export default function Button({children, onClick, ...props}) {

  return (
      <>
        <button onClick={onClick} {...props}>
          {children}
        </button>

        <style jsx>{`
          button {
            position: relative;
            background: #000;
            box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.42);
            border-radius: 19px;
            padding: .3rem 0;
            border: none;
            outline: none;
            font-size: 24px;
            transition: color .2s linear, background .2s linear;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            color: #fff;
            text-shadow: #000;

            &:hover {
              color: #F48432;
            }

            &.active {
              color: #FFFFFF;
              background: #F48432;
              box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.42);
              text-shadow: none;

              &:hover {
                color: gray;
              }
            }

            img {
              height: 24px;
              width: 24px;
            }
          }
        `}</style>
      </>
  )
}