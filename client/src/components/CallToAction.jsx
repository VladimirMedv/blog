import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn more about JavaScript?</h2>
        <p className="text-gray-500 my-2">
          100 JavaScript Projects for Web Developers
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none rounded-br-xl rounded-tr-none"
        >
          <a
            href="https://100jsprojects.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            100 JS Projects
          </a>
        </Button>
      </div>
      <div className="p-2 flex-1">
        <img
          src="https://codersfree.nyc3.cdn.digitaloceanspaces.com/posts/que-es-javascript-descubre-sus-5-principales-usos.jpg"
          alt="javascript"
        />
      </div>
    </div>
  );
}
