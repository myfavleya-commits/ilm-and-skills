import { Icon, LinkButton } from '../components/ui';

export default function NotFound() {
  return (
    <section className="container not-found">
      <span className="icon-tile">
        <Icon name="Compass" size={27} />
      </span>
      <h1>A different path, perhaps.</h1>
      <p>
        We couldn't find that page or course. The learning roadmap is a good
        place to find your way back.
      </p>
      <LinkButton to="/roadmap">Explore the roadmap</LinkButton>
    </section>
  );
}
