/**
 * 주의!
 * 실제 어플리케이션에서는 데이터 저장에 DB를 쓰는것이 일반적입니다.
 * 본 코드랩에서는 DB 설정 및 사용에 관한 내용을 담지 않으므로,
 * JavaScript로 가상의 DB를 직접 구현합니다.
 */

import DataLoader from 'dataloader'

export interface User {
  id: string
  displayName: string
}

const _users: User[] = [
  { id: 'b7ec1dab-9e0f-5924-88a0-1186ceb99416', displayName: 'Hester Dennis' },
  { id: '4deb4be5-343d-5e98-848e-4f7a584e360b', displayName: 'Kyle Powell' },
  { id: '60da7f12-bb22-58fa-97da-552d2081d42f', displayName: 'Nancy Quinn' },
  { id: 'e14a6005-0863-5d67-802a-152a8fad7aee', displayName: 'Julia Shaw' },
  { id: 'c6772454-78dc-56fe-889a-5d4d8336ea2c', displayName: 'Nathaniel Scott' },
]

export function find(id: string) {
  return _users.find((user) => user.id === id) ?? null
}

export async function findByIds(ids: readonly string[]) {
  /* tslint:disable-next-line */
  console.log('[INFO] Batch Users ' + JSON.stringify(ids))
  return ids.map((id) => _users.find((user) => user.id === id) ?? null)
}

export class UserLoader extends DataLoader<string, User | null> {
  constructor() {
    super(findByIds)
  }
}
