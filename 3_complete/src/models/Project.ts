/**
 * 주의!
 * 실제 어플리케이션에서는 데이터 저장에 DB를 쓰는것이 일반적입니다.
 * 본 코드랩에서는 DB 설정 및 사용에 관한 내용을 담지 않으므로,
 * JavaScript로 가상의 DB를 직접 구현합니다.
 */

import DataLoader from 'dataloader'

export interface Project {
  id: string
  name: string
  tagline: string
  contributorIds: string[]
}

const _projects: Project[] = [
  {
    id: '1d8df949-e7a1-5072-8af6-fc54254a60a3',
    name: 'GraphQL',
    tagline: 'Hello, World',
    contributorIds: [
      'b7ec1dab-9e0f-5924-88a0-1186ceb99416',
      '4deb4be5-343d-5e98-848e-4f7a584e360b',
      '60da7f12-bb22-58fa-97da-552d2081d42f',
    ],
  },
  {
    id: '0616495e-2874-555a-a8a9-444ae62f77de',
    name: 'TypeScript',
    tagline: 'Hello, Codelab',
    contributorIds: [
      'e14a6005-0863-5d67-802a-152a8fad7aee',
      'c6772454-78dc-56fe-889a-5d4d8336ea2c',
    ],
  },
]

export function find(id: string) {
  return _projects.find((project) => project.id === id) ?? null
}

export function findByName(name: string) {
  return _projects.find((project) => project.name === name) ?? null
}

export async function findByIds(ids: readonly string[]) {
  /* tslint:disable-next-line */
  console.log('[INFO] Batch Projects ' + JSON.stringify(ids))
  return ids.map((id) => _projects.find((project) => project.id === id) ?? null)
}

export class ProjectLoader extends DataLoader<string, Project | null> {
  constructor() {
    super(findByIds)
  }
}
