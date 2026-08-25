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
  headline:
    'Three of us built an information site during the 2025 protests, in six days. Most of the code is not mine. The rest of what I did is in the issues and the review threads.',
  tags: ['Next.js', 'Code review', 'Scoping', 'Civic'],
  year: '2025',
  summary:
    'A protest information site three of us built in six days: what I scoped, what I handed out, and one rename I caught before it shipped.',
  metadata: {
    role: 'Led it',
    timeline: '6 days',
    teamSize: '3',
  },
  availability: {
    note: 'live, and the repo is public',
    href: 'https://tuntutanrakyat.space',
  },
  blocks: [
    {
      type: 'prose',
      text: 'In late August 2025 the protests in Indonesia produced a list of demands, seventeen immediate and eight longer-term, and a lot of people looking for information they could act on: which emergency number to call, what your rights are if you are detained, where to find a lawyer or a psychologist. Three of us built a site for it. The first commit and the last one are six days apart.',
    },
    {
      type: 'prose',
      text: 'Forty-two of the 179 commits are mine, second of three, and that is one query away on a public repo. I wrote the landing page and the section listing the people who were killed. The six days went on deciding what we built, writing it down, handing it out, and reading pull requests before they merged.',
      href: 'https://github.com/fahrulalwan/tuntutan-rakyat/graphs/contributors',
      hrefLabel: 'Check the split',
    },
    {
      type: 'heading',
      text: 'A rename turned the bare path into a 404',
    },
    {
      type: 'prose',
      text: 'The emergency contacts page was the one page on the site somebody might open in a hurry, and the bare path was the link that had been shared. A refactor renamed its route segment from an optional catch-all to a single dynamic one, which quietly drops the bare path.',
    },
    {
      type: 'review',
      onWhat: 'a refactor of the emergency contacts route',
      where: 'src/app/kontak-darurat/[wilayah]/page.tsx',
      text: 'ini file direname dari `[[...wilayah]]` ke `[wilayah]` jadi kena error 404.\n\nexpected:\n- /kontak-darurat -> bisa, default to nasional\n- /kontak-darurat/jakarta -> bisa, param ke jakarta\n\nactual:\n- /kontak-darurat -> error 404\n- /kontak-darurat/jakarta -> bisa, param ke jakarta',
      href: 'https://github.com/fahrulalwan/tuntutan-rakyat/pull/31',
    },
    {
      type: 'prose',
      text: 'I followed it with two more, on a region that was not in the list and on the path ending in undefined, both of which the optional catch-all had been absorbing. The file on the default branch today is the optional catch-all, and all three of those paths still resolve.',
      href: 'https://tuntutanrakyat.space/kontak-darurat',
      hrefLabel: 'Open the page',
    },
    {
      type: 'heading',
      text: 'A section that would have depended on six other websites staying up',
    },
    {
      type: 'prose',
      text: 'A branch added a section linking similar efforts, and built it by pulling the title and description out of each of those six sites at request time, parsing their HTML. It worked. It also made our page depend on six pages we did not run, during a week when staying reachable was the entire point.',
    },
    {
      type: 'quote',
      text: 'Title: Lihat lainnya yang juga ikut berkontribusi\n\nlist websites to be listed:\n- rakyatmenuntut.net\n  Desc: Kompilasi 17+8 tuntutan dan dukungan karya perjuangan komunitas\n- indonesiademands.com\n  Desc: 17+8 English version of rakyatmenuntut, with detailed description\n- 178tuntutanrakyat.id\n  Desc: Community-driven progress update untuk masing-masing poin\n\n[…three more]',
      attribution: 'What I wrote on the pull request instead of merging it',
      href: 'https://github.com/fahrulalwan/tuntutan-rakyat/pull/19',
    },
    {
      type: 'trail',
      steps: [
        {
          when: '4 Sep, 13:19',
          what: 'The branch opens, fetching six sites at request time to build the section.',
          href: 'https://github.com/fahrulalwan/tuntutan-rakyat/pull/19/commits/cccea1ba',
        },
        {
          when: '4 Sep, 18:41',
          what: 'I write the section out instead: the heading and all six entries, each with its description.',
        },
        {
          when: '4 Sep, 23:36',
          what: 'Five hours later, on the same branch, the fetching is replaced by a static file.',
        },
        {
          when: '5 Sep, 06:12',
          what: 'The branch is withdrawn and reopened as a clean one.',
          href: 'https://github.com/fahrulalwan/tuntutan-rakyat/pull/21',
        },
        {
          when: '5 Sep, 10:20',
          what: 'It merges, reading the six from a constant.',
        },
      ],
      note: 'The HTML parser it started with never made it into the dependencies.',
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
        'A fourteen-line checklist: the medical emergency number, the fire service, the cyber-attack helpline, the missing-persons contact, two legal aid funds, and the accounts posting live updates. Assigned to one of the other two.',
      href: 'https://github.com/fahrulalwan/tuntutan-rakyat/issues/29',
    },
    {
      type: 'prose',
      text: 'Five issues, three of them handed to the other two, one left open for whoever got there first. The one I kept was the section listing the ten people who died during the protests, sourced from two national outlets. I wrote it, took it, and shipped it on the last day. It is the only part of the site I would not have handed to anyone else.',
      href: 'https://github.com/fahrulalwan/tuntutan-rakyat/issues/28',
      hrefLabel: 'The one I kept',
    },
  ],
};
