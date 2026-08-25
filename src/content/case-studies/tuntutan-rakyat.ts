import type { CaseStudy } from './types';

/**
 * The lead study. Its evidence is public review threads rather than commits,
 * which is the point: every other artifact on this site is something built
 * alone, and none of them can show work done through other people.
 *
 * ⛔ No names anywhere in this file. The threads are public and a reader who
 * clicks will see who wrote what, but nothing here puts a person as the
 * subject of a mistake. The subject is always the rename, the branch, or the
 * class name.
 */
export const tuntutanRakyatCaseStudy: CaseStudy = {
  slug: 'tuntutan-rakyat',
  /**
   * ⛔ The order of these three sentences is the finding, not a preference.
   *
   * It used to end on "Most of the code is not mine." On the landing card,
   * read by someone who never opens the study, a closing disclaimer is the
   * last thing they take away — so the card read as *he did not do much* on
   * the one study whose whole job is to show he led something. The fact stays,
   * because the humility is the point and it is checkable; it just stopped
   * being the final clause.
   */
  headline:
    'Five of us built an information site during the 2025 protests, in six days. Most of the code is someone else’s. I brought the four of them in and decided what we built.',
  tags: ['Next.js', 'Code review', 'Scoping', 'Civic'],
  year: '2025',
  summary:
    'A protest information site five of us built in six days. I brought the team in, decided what we built, and caught the change that broke a shared link.',
  metadata: {
    role: 'Led it',
    timeline: '6 days',
    teamSize: 'Five of us',
  },
  availability: {
    /* "code", not "repo". This string renders on the landing card, the most
       read surface on the site, and a reader with no engineering background
       does not have the word. */
    note: 'live, and the code is public',
    href: 'https://tuntutanrakyat.space',
  },
  blocks: [
    {
      type: 'prose',
      text: 'In late August 2025 the protests in Indonesia produced a list of demands, seventeen immediate and eight longer-term, and a lot of people looking for information they could act on: which emergency number to call, what your rights are if you are detained, where to find a lawyer or a psychologist. Five of us built a site for it, start to finish, in six days.',
    },
    {
      /* ⛔ Rewritten for a reader with no engineering context, 2026-08-25.
         It ran "I am second of three by commit count, and that is one query
         away on a public repo... Only three of the five of us are in that
         graph", then "reading pull requests before they merged" — five terms
         a layperson does not have (commit count, query, repo, graph, pull
         request). Every fact here is the same one; only the vocabulary moved.
         The link still goes to the contributors graph, which is where an
         engineer will want to land. */
      type: 'prose',
      text: 'All of the code is public, so anyone can see who wrote what. Of the three of us who wrote any, I wrote the second most. Only three of the five appear there at all, because that record counts people who typed code and not people who were on the thing. Mine was the front page and the section listing the people who were killed. The rest of my six days went on deciding what we would build, writing it down clearly enough to hand over, and reading everyone else’s work before it went live.',
      href: 'https://github.com/fahrulalwan/tuntutan-rakyat/graphs/contributors',
      hrefLabel: 'See who wrote what',
    },
    {
      /**
       * ⛔ Nothing here carries a link, and that is not an oversight. Finding
       * people, asking around, and messaging accounts leave their trace in
       * direct messages and in stories that expire. The rule this site holds
       * is that a claim never pretends to be checkable when it is not — the
       * same standing as the match-day count on the ticketing study.
       */
      type: 'prose',
      text: 'I brought the other four in: three from work, and a designer. The six days were not only the build: I asked around for ways to get more traffic, and messaged a few accounts who might share it. It drew four to five thousand visits in a week.',
    },
    {
      /* Was "A rename turned the bare path into a 404" — three terms deep for
         a reader who does not write software, on the section that carries the
         study's sharpest moment. */
      type: 'heading',
      text: 'The link people were passing around stopped working',
    },
    {
      type: 'prose',
      text: 'The emergency contacts page was the one page somebody might open in a hurry, and the short version of its address was the link being shared. A tidy-up changed how that address was handled, and the short version quietly started showing “page not found” instead. The longer version, with a region on the end, still worked — which is why nothing looked broken.',
    },
    {
      type: 'review',
      onWhat: 'the change that broke the link',
      where: 'src/app/kontak-darurat/[wilayah]/page.tsx',
      text: 'ini file direname dari `[[...wilayah]]` ke `[wilayah]` jadi kena error 404.\n\nexpected:\n- /kontak-darurat -> bisa, default to nasional\n- /kontak-darurat/jakarta -> bisa, param ke jakarta\n\nactual:\n- /kontak-darurat -> error 404\n- /kontak-darurat/jakarta -> bisa, param ke jakarta',
      href: 'https://github.com/fahrulalwan/tuntutan-rakyat/pull/31',
    },
    {
      type: 'prose',
      text: 'I found two more of the same kind while I was there: a region nobody had put on the list, and an address that ended in nothing at all. The old handling had been quietly absorbing both. It went back the way it was, and all three of those links work today.',
      href: 'https://tuntutanrakyat.space/kontak-darurat',
      hrefLabel: 'Open the page',
    },
    {
      type: 'heading',
      text: 'A section that would have depended on six other websites staying up',
    },
    {
      type: 'prose',
      text: 'Someone added a section listing similar efforts, and filled it by having our page go and fetch each of those six sites every time a visitor opened ours, reading the titles and descriptions straight off them. It worked. It also meant our page could only load as reliably as six sites we did not run, in a week when staying reachable was the entire point.',
    },
    {
      type: 'quote',
      text: 'Title: Lihat lainnya yang juga ikut berkontribusi\n\nlist websites to be listed:\n- rakyatmenuntut.net\n  Desc: Kompilasi 17+8 tuntutan dan dukungan karya perjuangan komunitas\n- indonesiademands.com\n  Desc: 17+8 English version of rakyatmenuntut, with detailed description\n- 178tuntutanrakyat.id\n  Desc: Community-driven progress update untuk masing-masing poin\n\n[…three more]',
      attribution: 'What I wrote back instead of approving it',
      href: 'https://github.com/fahrulalwan/tuntutan-rakyat/pull/19',
    },
    {
      type: 'trail',
      steps: [
        {
          when: '4 Sep, 13:19',
          what: 'The first version goes up: our page fetches all six sites live, every time a visitor loads it.',
          href: 'https://github.com/fahrulalwan/tuntutan-rakyat/pull/19/commits/cccea1ba',
        },
        {
          when: '4 Sep, 18:41',
          what: 'I write the section out by hand instead: the heading and all six entries, each with its description.',
        },
        {
          when: '4 Sep, 23:36',
          what: 'Five hours later the live fetching is gone, replaced by a plain list held on our own side.',
        },
        {
          when: '5 Sep, 06:12',
          what: 'The work is withdrawn and started again cleanly.',
          href: 'https://github.com/fahrulalwan/tuntutan-rakyat/pull/21',
        },
        {
          when: '5 Sep, 10:20',
          what: 'It goes live, with the six written into our own code.',
        },
      ],
      note: 'The tool it needed for reading other people’s pages never made it into the finished thing.',
    },
    {
      type: 'prose',
      text: 'The section is on the site now, under that heading, all six of them.',
      href: 'https://tuntutanrakyat.space/informasi#aksi-serupa',
      hrefLabel: 'See it live',
    },
    {
      type: 'heading',
      text: 'The work I wrote down and gave away',
    },
    {
      type: 'handoff',
      title: 'Update informasi kontak darurat',
      scope:
        'A fourteen-line checklist: the medical emergency number, the fire service, the cyber-attack helpline, the missing-persons contact, two legal aid funds, and the accounts posting live updates. Assigned to someone else.',
      href: 'https://github.com/fahrulalwan/tuntutan-rakyat/issues/29',
    },
    {
      type: 'prose',
      text: 'Five pieces of work written up this way. Three went to specific people, one was left open for whoever got there first, and one I kept: the section listing the ten people who died during the protests, sourced from two national outlets. I wrote it, took it, and put it up on the last day. Getting a name or a number wrong there would not have been a bug, and I wanted that to be my mistake if it happened.',
      href: 'https://github.com/fahrulalwan/tuntutan-rakyat/issues/28',
      hrefLabel: 'The one I kept',
    },
  ],
};
